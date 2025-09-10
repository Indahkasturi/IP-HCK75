
import { useEffect } from "react";
import Card from "./component/card";
import ChatBot from "./component/gemini";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbum } from "../store/album";
import Swal from "sweetalert2";

export default function Home() {
  const dispatch = useDispatch();
  const { albums, isLoading, errors } = useSelector((state) => state.albums);

  const addAlbumToCart = async (albumId) => {
    try {
      const response = await fetch(`http://localhost:3000/cart/${albumId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      await response.json();
      Swal.fire({
        icon: "success",
        text: "Album added to your cart",
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    dispatch(fetchAlbum());
  }, [dispatch]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#AFCCD3",
        fontFamily: "'Georgia', 'Times New Roman', Times, serif",
        padding: "0 0 120px 0", // Add more bottom padding for ChatBot
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          paddingTop: 24,
          paddingLeft: 16,
          paddingRight: 16,
          boxSizing: "border-box",
        }}
      >
       
        <h1
          style={{
            color: "#5E7B81",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: 28,
            fontFamily: "'Georgia', 'Times New Roman', Times, serif",
            fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
            letterSpacing: 1,
          }}
        >
        </h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 20,
            marginBottom: 32,
          }}
        >
          {isLoading && <p style={{ gridColumn: '1/-1', textAlign: 'center', color: '#5E7B81', fontSize: '1.1rem' }}>Loading...</p>}
          {errors && <p style={{ gridColumn: '1/-1', textAlign: 'center', color: '#B22222', fontSize: '1.1rem' }}>{errors}</p>}
          {albums.map((album) => (
            <div key={album.id} style={{ display: 'flex', justifyContent: 'center', minWidth: 0 }}>
              <Card album={album} onClick={() => addAlbumToCart(album.id)} />
            </div>
          ))}
        </div>
      </div>
      {/* Responsive ChatBot positioning */}
      <div
        style={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 100,
          maxWidth: '90vw',
          width: '350px',
          minWidth: '220px',
          transition: 'all 0.2s',
        }}
        className="chatbot-responsive"
      >
        <ChatBot />
      </div>
      <style>{`
        @media (max-width: 700px) {
          .chatbot-responsive {
            right: 50%;
            left: 50%;
            transform: translateX(-50%);
            width: 95vw !important;
            min-width: 0 !important;
            max-width: 98vw !important;
            bottom: 8px !important;
          }
        }
      `}</style>
    </div>
  );
}
