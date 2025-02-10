import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { fetchAlbum } from "../../store/album";
import { useDispatch, useSelector } from "react-redux";

export default function Admin() {
  const { albums } = useSelector((state) => state.albums);
  const dispatch = useDispatch();

  const handleOnDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      Swal.fire({
        icon: "success",
        title: "Album deleted successfully",
      });
      dispatch(fetchAlbum()); // Refresh the album list after deletion
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data.message || "Failed to delete album",
      });
    }
  };

  useEffect(() => {
    dispatch(fetchAlbum());
  }, [dispatch]);

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
                <th scope="col" >Price</th>
                <th scope="col" width="100px"></th>
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
                      <Link to={`/upload/${album.id}`} className="btn btn-outline-primary me-2 text-decoration-none text-reset">
                        Upload Image
                      </Link>
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