import { useEffect, useState } from "react";
import Card from "../component/card";
import Navbar from "../component/navbar";
import axios from "axios";


export default function Home() {
    const [albums, setAlbums] = useState([]);

    let getLodgings = async () => {
      let { data } = await axios({
        method: "get",
        url: "'localhost:3000/",
      });
      console.log(data);
      
      setAlbums(data.data.query);
    };
  
    useEffect(() => {
      getLodgings();
      
    }, []);
  return (
      <>

     <Navbar/>
     {albums.map((album)=>{
        return(
            <Card
            key={album.id}
            album={album}/>

        )
     })}

      </>
  )
}