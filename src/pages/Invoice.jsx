import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

export default function Invoice() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const reservationId = state?.reservationId;

  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    if (!reservationId) return;
    api.get(`/api/v1/invoices/by-reservation/${reservationId}`)
      .then((res) => setInvoice(res.data))
      .catch((e) => console.log(e));
  }, [reservationId]);

  if (!reservationId) return navigate("/rooms");

  return (
    <div style={{ maxWidth: 900, margin: "3rem auto", padding: "1.5rem", background: "white", borderRadius: 16 }}>
      <h2>Invoice</h2>

      {!invoice ? (
        <p>Loading invoice...</p>
      ) : (
        <>
          <div style={{ marginTop: 12 }}>
            <div><strong>Invoice ID:</strong> {invoice.id}</div>
            <div><strong>Reservation:</strong> {invoice.reservationId}</div>
            <div><strong>Payment:</strong> {invoice.paymentId}</div>
            <div><strong>Total:</strong> {invoice.currency} {Number(invoice.totalAmount).toLocaleString()}</div>
          </div>

          <div style={{ marginTop: 18, display: "flex", gap: 10 }}>
            <button onClick={() => window.print()}>Print</button>
            <button onClick={() => navigate("/rooms")}>Back to Rooms</button>
          </div>
        </>
      )}

<button
  onClick={() =>
    window.open(
      `http://localhost:9001/api/v1/invoices/${invoice.id}/pdf`,
      "_blank"
    )
  }
>
  Download PDF
</button>


    </div>
    
  );
}
