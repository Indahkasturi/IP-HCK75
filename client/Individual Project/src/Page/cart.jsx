import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart data
  const fetchCartItems = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: "http://localhost:3000/cart",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setCartItems(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while fetching the cart!",
      });
    }
  };

  // Remove one quantity from cart
  const deleteCartItem = async (albumId) => {
    try {
      await axios({
        method: "delete",
        url: `http://localhost:3000/deletecart/${albumId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      fetchCartItems();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.message,
      });
    }
  };

  // Add one quantity to cart
  const addCartItem = async (albumId) => {
    try {
      await axios({
        method: "post",
        url: `http://localhost:3000/cart/${albumId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      fetchCartItems();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.message,
      });
    }
  };

  
  useEffect(() => {
    fetchCartItems();
  }, []);
  
  const handleCheckout = async () => {
  try {
    const token = localStorage.getItem("access_token");
    await axios.post('http://localhost:3000/checkout', {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    Swal.fire('Success', 'Checkout berhasil!', 'success');
    setCartItems([]); // Kosongkan cart di frontend
  } catch (err) {
    Swal.fire('Error', err.response?.data?.message || 'Checkout gagal', 'error');
  }
};
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#AFCCD3",
        fontFamily: "'Georgia', 'Times New Roman', Times, serif",
        padding: "0 0 40px 0",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          paddingTop: 40,
          paddingLeft: 16,
          paddingRight: 16,
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            color: "#5E7B81",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: 36,
            fontFamily: "'Georgia', 'Times New Roman', Times, serif",
            fontSize: 32,
            letterSpacing: 1,
          }}
        >
          Your Cart
        </h2>
        {cartItems.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#51696E', fontSize: 18 }}>No items in cart</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 20,
              marginBottom: 32,
            }}
          >
            {cartItems.map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'center', minWidth: 0 }}>
                <div
                  style={{
                    width: '100%',
                    maxWidth: 340,
                    margin: '0 auto',
                    background: '#fff',
                    borderRadius: 12,
                    boxShadow: '0 2px 12px 0 rgba(94, 123, 129, 0.10)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    minHeight: 380,
                  }}
                >
                  <div style={{ width: '100%', aspectRatio: '1 / 1', background: '#f4f4f4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img
                      src={item.Album.imageUrl}
                      alt="Album cover"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12,
                        background: '#f4f4f4',
                        maxHeight: '100%',
                        maxWidth: '100%',
                        display: 'block',
                      }}
                    />
                  </div>
                  <div style={{ padding: 18, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: 20, color: '#5E7B81', margin: 0, marginBottom: 8 }}>{item.Album.albumTitle}</h3>
                      <h4 style={{ fontSize: 16, color: '#51696E', margin: 0, marginBottom: 12 }}>{item.Album.artistName}</h4>
                      <h6 style={{ color: "#51696E", fontSize: 15, margin: 0, marginBottom: 10 }}>
                        Price: Rp.{item.Album.price}
                      </h6>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                        <button
                          style={{
                            background: '#7DABB7',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 6,
                            padding: '2px 10px',
                            fontWeight: 700,
                            fontSize: 18,
                            marginRight: 8,
                            cursor: 'pointer',
                          }}
                          onClick={() => deleteCartItem(item.Album.id)}
                        >
                          -
                        </button>
                        <span style={{ fontSize: 16, color: '#51696E', fontWeight: 600, minWidth: 24, textAlign: 'center' }}>{item.quantity}</span>
                        <button
                          style={{
                            background: '#7DABB7',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 6,
                            padding: '2px 10px',
                            fontWeight: 700,
                            fontSize: 18,
                            marginLeft: 8,
                            cursor: 'pointer',
                          }}
                          onClick={() => addCartItem(item.Album.id)}
                        >
                          +
                        </button>
                      </div>
                      <h6 style={{ color: "#5E7B81", fontSize: 16, margin: 0, marginBottom: 10, fontWeight: 700 }}>
                        Total: Rp.{item.Album.price * item.quantity}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
{cartItems.length > 0 && (
  <div style={{ textAlign: 'center', marginBottom: 32 }}>
    <button
      onClick={handleCheckout}
      style={{
        background: '#5E7B81',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        padding: '12px 32px',
        fontWeight: 700,
        fontSize: 18,
        cursor: 'pointer',
        boxShadow: '0 2px 8px 0 rgba(94, 123, 129, 0.10)',
        marginTop: 16,
      }}
      onMouseOver={e => e.currentTarget.style.background = '#7DABB7'}
      onMouseOut={e => e.currentTarget.style.background = '#5E7B81'}
    >
      Checkout
    </button>
  </div>
)}
    </div>
  );
}
