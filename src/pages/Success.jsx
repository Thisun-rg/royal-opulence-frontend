import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosInstance";
import "./Success.css";

export default function Success() {
  const { paymentId } = useParams();
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setErrMsg("");
        const res = await api.get(`/api/v1/invoices/by-payment/${paymentId}`);
        setInvoice(res.data);
      } catch (err) {
        console.log(err);
        setErrMsg("Could not load invoice. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (!paymentId) {
      setLoading(false);
      setErrMsg("Missing payment id.");
      return;
    }

    load();
  }, [paymentId]);

  return (
    <div style={{ maxWidth: 900, margin: "2.5rem auto", padding: "1.5rem" }}>
      <h1 style={{ marginBottom: 12 }}>Payment Successful 🎉</h1>

      {loading && <p>Loading invoice...</p>}

      {!loading && errMsg && (
        <>
          <p>{errMsg}</p>
          <button className="btnSecondary" onClick={() => navigate("/rooms")}>
            Back to Rooms
          </button>
        </>
      )}

      {!loading && invoice && (
        <div
          style={{
            background: "white",
            borderRadius: 18,
            border: "1px solid rgba(197,162,83,0.55)",
            padding: 18,
          }}
        >
          <p>
            <strong>Invoice ID:</strong> {invoice.invoiceId || invoice.id}
          </p>
          <p>
            <strong>Payment ID:</strong> {invoice.paymentId}
          </p>
          <p>
            <strong>Reservation ID:</strong> {invoice.reservationId}
          </p>
          <p>
            <strong>Total:</strong> {invoice.currency}{" "}
            {Number(invoice.totalAmount).toLocaleString()}
          </p>

          {/* ✅ UPDATED BUTTON CLASSES HERE */}
          <div className="successActions">
            <button className="btnSecondary" onClick={() => navigate("/rooms")}>
              Book Another Room
            </button>

            <button
              className="btnPrimary"
              onClick={async () => {
                const invoiceId = invoice.invoiceId || invoice.id;

                try {
                  const token = localStorage.getItem("token");
                  if (!token) {
                    alert("Missing token. Please login again.");
                    return;
                  }

                  const res = await api.get(`/api/v1/invoices/${invoiceId}/pdf`, {
                    responseType: "blob",
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });

                  const blob = new Blob([res.data], { type: "application/pdf" });
                  const url = window.URL.createObjectURL(blob);

                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `invoice-${invoiceId}.pdf`;
                  document.body.appendChild(a);
                  a.click();
                  a.remove();

                  window.URL.revokeObjectURL(url);
                } catch (err) {
                  console.log("PDF download error:", err);
                  console.log("Status:", err?.response?.status);
                  console.log("Data:", err?.response?.data);

                  alert(
                    `Failed to download invoice. Status: ${
                      err?.response?.status || "unknown"
                    }`
                  );
                }
              }}
            >
              Download Invoice PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
