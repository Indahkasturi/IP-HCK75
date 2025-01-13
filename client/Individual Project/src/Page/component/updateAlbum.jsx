import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'

export default function Update() {
  const [artistName, setArtistName] = useState("");
  const [albumTitle, setAlbumTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState(0);

  const { id } = useParams(); 
  const navigate = useNavigate();

  const getAlbum = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/update/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setArtistName(data.artistName);
      setAlbumTitle(data.albumTitle);
      setGenre(data.genre);
      setImageUrl(data.imageUrl);
      setPrice(data.price);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data.message,
      });
    }
  };

  useEffect(() => {
    getAlbum();
  }, [id]);

  const handleOnUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/update/${id}`,
        {
          artistName,
          albumTitle,
          genre,
          imageUrl,
          price: Number(price),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      navigate('/admin');
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <section
      className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
      id="new-product-section"
      style={{ marginRight: "8%" }}
    >
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="display-2">Update Album</h1>
      </div>
      <div className="row">
        <div className="col-12 col-md-6">
          <form id="product-form" onSubmit={handleOnUpdate}>
            <div className="mb-3">
              <label htmlFor="artist-name">
                Artist Name <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="artist-name"
                placeholder="Enter artist name"
                autoComplete="off"
                required
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="album-title">
                Album Title <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="album-title"
                placeholder="Enter album title"
                autoComplete="off"
                required
                value={albumTitle}
                onChange={(e) => setAlbumTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="genre">
                Genre <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="genre"
                placeholder="Enter genre"
                autoComplete="off"
                required
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image-url">
                Image URL <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="image-url"
                placeholder="Enter image URL"
                autoComplete="off"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price">
                Price <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                placeholder="Enter price"
                autoComplete="off"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="row mt-5 mb-3">
              <div className="col-6">
                <button
                  className="btn btn-lg btn-primary rounded-pill w-100 p-2"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
