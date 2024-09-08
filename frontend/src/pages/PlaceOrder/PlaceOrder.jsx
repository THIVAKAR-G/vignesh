import React, { useContext, useState } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './PlaceOrder.css';
import OrderPopup from '../../components/OrderPopup'; // Import the popup component

const PlaceOrder = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    });
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);

    const { getTotalCartAmount, food_list, cartItems } = useContext(StoreContext);

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        const orderId = Math.floor(Math.random() * 1000000000); // Generate a random order number

        // Add a green tick mark (✅)
        doc.setFontSize(24);
        doc.setTextColor(0, 128, 0); // Green color
        doc.text('✅', 105, 20, { align: 'center' });

        // Set Order Title
        doc.setFontSize(22);
        doc.setTextColor(0, 128, 0);
        doc.text('Order Successfully Submitted', 105, 40, { align: 'center' });

        // Add Subtitle
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text('Thank you for ordering. Your order details are below:', 105, 55, { align: 'center' });
        doc.text('Please be share these pdf into  Phone: 6369808817 :', 105, 30, { align: 'center' });
        // Draw horizontal line below subtitle
        doc.setLineWidth(0.5);
        doc.line(15, 60, 195, 60);

        // Add Order Number
        doc.setFontSize(12);
        doc.text(`Order Number: ${orderId}`, 105, 70, { align: 'center' });

        // Add Customer Address
        doc.setFontSize(10);
        doc.text('Customer Address:', 15, 85);
        doc.text(`${data.firstName} ${data.lastName}`, 15, 95);
        doc.text(`${data.street}`, 15, 105);
        doc.text(`${data.city}`, 15, 115);
        doc.text(`${data.state}, ${data.zipcode}`, 15, 125);
        doc.text(`${data.country}`, 15, 135);
        doc.text(`Phone: ${data.phone}`, 15, 145);

        // Add Shop Address
        doc.text('Shop Address:', 150, 85);
        doc.text('SRI Vigneshwara Crackers', 150, 95);
        doc.text('Kalugumalai Road', 150, 105);
        doc.text('Sivakasi', 150, 115);
        doc.text('Tamil Nadu 626189', 150, 125);
        doc.text('Phone: 6369808817', 150, 135);

        // Draw horizontal lines
        doc.setLineWidth(0.5);
        doc.line(15, 150, 150, 150); // Line below customer address
        doc.line(150, 150, 195, 150); // Line below shop address

        // Add cart items
        const items = food_list.filter(item => cartItems[item._id] > 0).map(item => ({
            name: item.name,
            qty: cartItems[item._id],
            price: item.price
        }));

        const tableColumn = ["S.No", "Product Name", "Qty", "Amount"];
        const tableRows = items.map((item, index) => [
            index + 1,
            item.name,
            item.qty,
            `${(item.price * item.qty).toFixed(2)}`
        ]);

        doc.autoTable({
            startY: 155,
            head: [tableColumn],
            body: tableRows,
            theme: 'grid',
            columnStyles: {
                0: { cellWidth: 20 },
                1: { cellWidth: 100 },
                2: { cellWidth: 30 },
                3: { cellWidth: 40 }
            },
            margin: { top: 10 },
            styles: { halign: 'center', fontSize: 10 },
            headStyles: { fillColor: [0, 128, 0], textColor: [255, 255, 255] }
        });

        // Add totals
        const subtotal = getTotalCartAmount();
        const packingCharge = 5; // example delivery fee
        const total = subtotal + packingCharge;

        doc.setFontSize(12);
        doc.text(`Subtotal: ${subtotal.toFixed(2)}`, 120, doc.lastAutoTable.finalY + 10, { align: 'right' });
        doc.text(`Packing Charge: ${packingCharge.toFixed(2)}`, 120, doc.lastAutoTable.finalY + 20, { align: 'right' });
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text(`Total: ${total.toFixed(2)}`, 120, doc.lastAutoTable.finalY + 30, { align: 'right' });

        // Add bank details box at the bottom center
        const bankDetailsY = doc.internal.pageSize.height - 50;
        doc.setFillColor(240, 240, 240); // Light gray background
        doc.rect(15, bankDetailsY, 180, 40, 'F'); // Background box

        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0); // Black text
        doc.text('Bank Details:', 105, bankDetailsY + 10, { align: 'center' });
        doc.text('Account Number: 1234567890', 105, bankDetailsY + 15, { align: 'center' });
        doc.text('IFSC Code: ABCD0123456', 105, bankDetailsY + 20, { align: 'center' });
        doc.text('Branch: Main Branch', 105, bankDetailsY + 25, { align: 'center' });
        doc.text('Bank Name: XYZ Bank', 105, bankDetailsY + 30, { align: 'center' });

        // Convert PDF to Blob and create a URL
        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);

        // Open PDF in a new window
        window.open(pdfUrl, '_blank');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPopupOpen(true);
    };

    const handlePopupSubmit = (details) => {
        setOrderDetails(details);
        setIsPopupOpen(false);
        toast.success('Generating Bill!', {
            autoClose: 2000,
            onClose: () => {
                setTimeout(() => {
                    generatePDF();
                }, 500);
            }
        });
    };

    const handlePopupClose = () => {
        setIsPopupOpen(false);
    };

    return (
        <>
            <form className='place-order' onSubmit={handleSubmit}>
                <div className="place-order-left">
                    <p className='title'>Delivery Information</p>
                    <div className="multi-field">
                        <input 
                            type="text" 
                            name='firstName' 
                            placeholder='First name' 
                            value={data.firstName} 
                            onChange={onChangeHandler} 
                            required 
                        />
                        <input 
                            type="hidden" 
                            name='firstName' 
                            placeholder='First name' 
                            value={data.firstName} 
                            onChange={onChangeHandler} 
                            required 
                        />
                        <input 
                            type="text" 
                            name='lastName' 
                            placeholder='Last name' 
                            value={data.lastName} 
                            onChange={onChangeHandler} 
                            required 
                        />
                    </div>
                    <input 
                        type="text" 
                        name='street' 
                        placeholder='Street' 
                        value={data.street} 
                        onChange={onChangeHandler} 
                        required 
                    />
                    <div className="multi-field">
                        <input 
                            type="text" 
                            name='city' 
                            placeholder='City' 
                            value={data.city} 
                            onChange={onChangeHandler} 
                            required 
                        />
                        <input 
                            type="text" 
                            name='state' 
                            placeholder='State' 
                            value={data.state} 
                            onChange={onChangeHandler} 
                            required 
                        />
                    </div>
                    <div className="multi-field">
                        <input 
                            type="text" 
                            name='zipcode' 
                            placeholder='pin code' 
                            value={data.zipcode} 
                            onChange={onChangeHandler} 
                            required 
                        />
                    </div>
                    <input 
                        type="text" 
                        name='phone' 
                        placeholder='Phone' 
                        value={data.phone} 
                        onChange={onChangeHandler} 
                        required 
                    />
                </div>
                <div className="place-order-right">
                    <div className="cart-total">
                        <h2>Cart Totals</h2>
                        <div>
                            <div className="cart-total-details">
                                <p>Subtotal</p>
                                <p>₹{getTotalCartAmount()}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <p>Packing Charge</p>
                                <p>₹5</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <b>Total</b>
                                <b>₹{getTotalCartAmount() + 5}</b>
                            </div>
                        </div>
                    </div>
                    <center>
                        <button className='place-order-submit' type='submit'>Place Order</button>
                    </center>
                </div>
            </form>

            <OrderPopup 
                isOpen={isPopupOpen}
                onClose={handlePopupClose}
                onSubmit={handlePopupSubmit}
            />
        </>
    );
};

export default PlaceOrder;
