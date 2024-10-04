import { useEffect, useState } from "react";
import Card from "./component/card";
import axios from "axios";
import ChatBot from "./component/gemini";


export default function Home() {
    const [albums, setAlbums] = useState([]);

    let getAlbum = async () => {
      let { data } = await axios({
        method: "get",
        url: "http://localhost:3000/",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      console.log(data);
      
      setAlbums(data);
    };

    const addAlbumToCart = async (albumId) => {
        try {
          const response = await fetch(`http://localhost:3000/cart/${albumId}`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}` 
            }
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
          }
      
          const data = await response.json();
          console.log('Album added to cart:', data); 
        } catch (error) {
          console.error(error.response.data);
        }
      };
      
  
    useEffect(() => {
      getAlbum();
      
    }, []);
  return (
      <>
     {albums.map((album)=>{
        return(
            <Card
            key={album.id}
            album={album}
            onClick={addAlbumToCart}/>
        )
     })}

     <ChatBot/>

      </>
  )
}