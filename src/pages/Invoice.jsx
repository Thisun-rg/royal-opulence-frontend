import React from "react";
import "./Invoice.css";

const Invoice = ({ invoice }) => {
  return (
    <div className="invoice-container">
      <div className="invoice-card">
        <h2>Invoice</h2>

        <div className="invoice-section">
          <p><strong>Invoice No:</strong> {invoice?.invoiceNumber}</p>
          <p><strong>Date:</strong> {invoice?.date}</p>
        </div>

        <div className="invoice-section">
          <p><strong>Guest:</strong> {invoice?.guestName}</p>
          <p><strong>Room:</strong> {invoice?.roomType}</p>
        </div>

        <div className="invoice-total">
          <h3>Total Paid</h3>
          <span>LKR {invoice?.totalAmount}</span>
        </div>

        <button className="gold-btn">Download PDF</button>
      </div>
    </div>
  );
};

export default Invoice;
