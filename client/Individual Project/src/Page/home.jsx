import { useEffect } from "react";
import Card from "./component/card";
import ChatBot from "./component/gemini";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbum } from "../store/album";
import Swal from "sweetalert2";

export default function Home() {
  const dispatch = useDispatch();
  const { albums } = useSelector((state) => state.albums);

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
    <>
      <div>
        <div className="row">
          {albums.map((album) => (
            <div className="col-3" key={album.id}>
              <Card album={album} onClick={() => addAlbumToCart(album.id)} />
            </div>
          ))}
        </div>
      </div>
      <ChatBot />
    </>
  );
}