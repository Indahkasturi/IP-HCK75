import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Admin() {
  const [albums, setAlbums] = useState([]);

  const getAlbums = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setAlbums(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const handleOnDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      getAlbums();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "your not authorized",
      });
    }
  };

  useEffect(() => {
    getAlbums();
  }, []);

  return (
<section
  className="col-md-9 ms-sm-auto col-lg-10 px-md-4 text-center"
  id="product-section"
  style={{ marginRight: "8%", padding: "0" }}
>
  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 className="display-2">List Album</h1>
    <Link to="/addAlbum" className="btn btn-outline-primary">
      Add Album
    </Link>
  </div>
  <div className="row justify-content-center">
    <div className="col-12 table-responsive">
      <table className="table align-middle" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th scope="col" width="180px">Image</th>
            <th scope="col">Artist Name</th>
            <th scope="col" width="250px">Album Title</th>
            <th scope="col">Genre</th>
            <th scope="col">Price</th>
            <th scope="col" width="100px" />
          </tr>
        </thead>
        <tbody id="table-product">
          {albums.map((album) => (
            <tr key={album.id}>
              <td>
                <img src={album.imageUrl} alt={album.albumTitle} className="img-fluid" />
              </td>
              <td className="fw-bold">{album.artistName}</td>
              <td>{album.albumTitle}</td>
              <td>{album.genre}</td>
              <td>{album.price}</td>
              <td>
                <div className="d-flex justify-content-between">
                  <Link to={`/update/${album.id}`} className="btn btn-outline-primary me-2 text-decoration-none text-reset">
                    Update
                  </Link>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleOnDelete(album.id)}
                  >
                    Delete
                  </button>
                  <Link to={`/upload/${album.id}`} className="btn btn-outline-primary me-2 text-decoration-none text-reset"> Upload Image</Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</section>

  );
}
