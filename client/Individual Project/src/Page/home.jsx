import { useEffect, useState } from "react";
import Card from "./component/card";
import Navbar from "./component/navbar";
import axios from "axios";


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
              'Authorization': `Bearer ${localStorage.getItem("access_token")}` 
            }
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error adding album to cart');
          }
      
          const data = await response.json();
          console.log('Album added to cart:', data); // Data yang dikembalikan dari server
        } catch (error) {
          console.error(error.response.data);
        }
      };
      
  
    useEffect(() => {
      getAlbum();
      
    }, []);
  return (
      <>

     <Navbar/>
     {albums.map((album)=>{
        return(
            <Card
            key={album.id}
            album={album}
            onClick={addAlbumToCart}/>
        )
     })}

      </>
  )
}