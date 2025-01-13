import { useEffect, useState } from "react";
import Card from "./component/card";
import ChatBot from "./component/gemini";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbumSuccess, isLoading, isError, fetchAlbum } from "../store/album";

export default function Home() {
  // const [albums, setAlbums] = useState([]);
  const dispatch = useDispatch()
  const {albums, isLoading, errors} = useSelector((state)=> state.albums)


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

      const data = await response.json();
      console.log("Album added to cart:", data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    dispatch(fetchAlbum());
  }, []);
  return (
    <>
     <div>
       <div className="row">
      {albums.map((album) => {
        return ( 
            <div className="col-3">
          <Card key={album.id} 
         // albumId={album.id} 
         album={album} 
         onClick={addAlbumToCart} />;
          </div>
        )
      })}
      </div>
      </div>
     
        <ChatBot />
    </>
  );
}
