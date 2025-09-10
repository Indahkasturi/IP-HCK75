import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);


    const handleCheckout = async () => {
        try {
            const token = localStorage.getItem("access_token");
            await axios.post('http://localhost:3000/orders/checkout', {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            Swal.fire('Success', 'Order processed successfully!', 'success');
            setCartItems([]); // Kosongkan cart di frontend
        } catch (err) {
            Swal.fire('Error', err.response?.data?.message || 'Order failed', 'error');
        }
    };
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("access_token");
                const { data } = await axios.get("http://localhost:3000/orders", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setOrders(data);
            } catch (err) {
                alert("Gagal mengambil data orders");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <div style={{ textAlign: "center", marginTop: 40 }}>Loading...</div>;

    return (
        
        <div style={{ maxWidth: 900, margin: "40px auto", fontFamily: "Georgia, serif" }}>
            <h2 style={{ color: "#5E7B81", textAlign: "center", marginBottom: 32 }}>Daftar Checkout User</h2>
            {orders.length === 0 ? (
                <div style={{ textAlign: "center", color: "#51696E" }}>Belum ada checkout.</div>
            ) : (
                orders.map(order => (
                    <div key={order.id} style={{
                        background: "#fff",
                        borderRadius: 10,
                        boxShadow: "0 2px 8px 0 rgba(94, 123, 129, 0.10)",
                        marginBottom: 24,
                        padding: 24,
                        border: "1.5px solid #AFCCD3"
                    }}>
                        <div style={{ marginBottom: 10, color: "#51696E" }}>
                            <b>User:</b> {order.User?.email || order.UserId} <br />
                            <b>Tanggal:</b> {new Date(order.createdAt).toLocaleString()}
                        </div>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr style={{ background: "#AFCCD3", color: "#fff" }}>
                                    <th style={{ padding: 8, borderRadius: 4 }}>Album</th>
                                    <th style={{ padding: 8, borderRadius: 4 }}>Artist</th>
                                    <th style={{ padding: 8, borderRadius: 4 }}>Qty</th>
                                    <th style={{ padding: 8, borderRadius: 4 }}>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.OrderItems.map(item => (
                                    <tr key={item.id}>
                                        <td style={{ padding: 8 }}>{item.Album?.albumTitle}</td>
                                        <td style={{ padding: 8 }}>{item.Album?.artistName}</td>
                                        <td style={{ padding: 8, textAlign: "center" }}>{item.quantity}</td>
                                        <td style={{ padding: 8 }}>Rp.{item.Album?.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))
            )}
        </div>
    );
}