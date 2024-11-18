import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  // Fungsi untuk mengambil data cart dari server
  const fetchCartItems = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: "http://localhost:3000/cart",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Token autentikasi
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

  // Fungsi untuk menghapus item dari cart
  const deleteCartItem = async (albumId) => {
    try {
      await axios({
        method: "delete",
        url: `http://localhost:3000/deletecart/${albumId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`, 
        },
      });

      Swal.fire({
        icon: "success",
        title: "Item removed!",
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

  return (
    <section>
      <div className="container mt-5">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <div className="row">
            {cartItems.map((item) => (
              <div className="col-md-3 mb-4 col-sm-6" key={item.id}>
                <div
                  className="card"
                  style={{
                    width: "100%",
                    minHeight: "400px",
                    flexDirection: "column",
                  }}
                >
                  <img
                    className="card-img-top"
                    src={item.Album.imageUrl}
                    alt="Album cover"
                  />
                  <div className="card-body">
                    <h3 className="card-title">{item.Album.albumTitle}</h3>
                    <h4>{item.Album.artistName}</h4>
                    <h6 style={{ color: "rgba(0, 0, 0, 0.7)" }}>
                      Rp.{item.Album.price}
                    </h6>
                    <button
                      className="btn btn-danger mt-3"
                      onClick={() => deleteCartItem(item.Album.id)}
                    >
                      Remove
                    </button>
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
