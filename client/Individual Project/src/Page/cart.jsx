import { useEffect, useState } from "react";
import axios from "axios";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  // Fungsi untuk mendapatkan item dari cart
  const fetchCartItems = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: "http://localhost:3000/cart",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Menggunakan token yang disimpan
        },
      });

      setCartItems(data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <section>
      <div className="container mt-5">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <div className="row">
            {cartItems.map((item) => (
              <div className="col-md-3 mb-4 col-sm-6" key={item.id}> {/* Gunakan key untuk setiap item */}
                <div className="card" style={{ width: "100%" }}>
                  <img
                    className="card-img-top"
                    src={item.Album.imageUrl}
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h3 className="card-title">{item.Album.albumTitle}</h3>
                    <h4>{item.Album.artistName}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
