import React, { useState } from 'react';
import './OrderPopup.css';

const OrderPopup = ({ isOpen, onClose, onSubmit }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create a FormData object to handle form data submission
        const formData = new FormData(e.target);
        
        // Send the form data to the external API
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            onSubmit({ name, phone }); // Call the onSubmit function passed as a prop
            onClose(); // Close the popup
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    if (!isOpen) return null;

    return (
        <div className="order-popup-overlay">
            <div className="order-popup">
                <h2 className="popup-title">Order Details</h2>
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="access_key" value="862f10c1-7d6b-4b86-87c7-b609d5a3865c"/>
                    <div className="form-group">
                        <marquee behavior="alternate" direction="">
                            <h2>Contact Purpose</h2>
                        </marquee>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone:</label>
                        <input
                            type="text"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div className="button-group">
                        <button type="submit" className="submit-btn">Submit</button>
                        <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OrderPopup;
