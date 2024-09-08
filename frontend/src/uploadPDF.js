// src/uploadPDF.js
import { storage } from './Context/firebase';

const uploadPDFToHosting = async (pdfBlob) => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child('orders/order.pdf');
    
    try {
        await fileRef.put(pdfBlob); // Upload the file
        const downloadURL = await fileRef.getDownloadURL(); // Get the URL
        return downloadURL;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};

export default uploadPDFToHosting;
