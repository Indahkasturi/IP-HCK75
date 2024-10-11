import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

export default function Add() {
  const [artistName, setArtistName] = useState("");
  const [albumTitle, setAlbumTiltle] = useState("");
  const [genre, setGenre] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState(0)

  const navigate = useNavigate()

  const handleOnCreateLodging = async (e) => {
    e.preventDefault();
    try {
     const{ data } = await axios({
        method: 'post',
        url: 'http://localhost:3000/addAlbum',
        data: {
        artistName,
        albumTitle,
        genre,
        imageUrl,
        price: Number(price)
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      navigate('/admin')

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
      style={{ marginRight: "10%" }}
    >

      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="display-2">Add Album</h1>
      </div>
      <div className="row">
        <div className="col-12 col-md-6">
          <form id="product-form" onSubmit={handleOnCreateLodging}>
            <div className="mb-3">
              <label htmlFor="product-name">
                Artist Name <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="product-name"
                placeholder="Enter product name"
                autoComplete="off"
                required=""
                value={artistName}
                onChange={(e)=> setArtistName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="product-name">
                Album Title <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="product-name"
                placeholder="Enter product name"
                autoComplete="off"
                required=""
                value={albumTitle}
                onChange={(e)=> setAlbumTiltle(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="product-name">
                Genre <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="product-name"
                placeholder="Enter product name"
                autoComplete="off"
                required=""
                value={genre}
                onChange={(e)=> setGenre(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="product-name">
                Image Url <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="product-name"
                placeholder="Enter product name"
                autoComplete="off"
                required=""
                value={imageUrl}
                onChange={(e)=> setImageUrl(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="product-name">
                 Price <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="product-name"
                placeholder="Enter product name"
                autoComplete="off"
                required=""
                value={price}
                onChange={(e)=> setPrice(e.target.value)}
              />
            </div>

            <div className="row mt-5 mb-3">
             
              <div className="col-6">
                <button
                  className="btn btn-lg btn-primary rounded-pill w-100 p-2"
                  type="submit"
                  onClick={handleOnCreateLodging}
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
