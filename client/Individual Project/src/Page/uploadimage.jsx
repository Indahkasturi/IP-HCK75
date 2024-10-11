import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

export default function UploadImage() {
  const { id } = useParams();
  // console.log(id);
  const navigate = useNavigate()

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("imageUrl", selectedImage);

    try {
      const { data } = await axios.patch(
        `http://localhost:3000/album/${id}/imageUrl`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Image uploaded successfully",
        text: data.message,
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
    <div style={{ maxWidth: '500px', margin: '20px auto' }}>
      <h2 style={{ textAlign: 'center' }}>Upload Image</h2>
      <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="imageUrl" style={{ marginBottom: '5px', fontWeight: 'bold' }}>Upload Image</label>
          <input 
            type="file" 
            id="imageUrl" 
            name="imageUrl" 
            accept="image/*" 
            onChange={handleImageChange} 
            style={{ border: '1px solid #ccc', borderRadius: '4px' }} 
          />
        </div>
        <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Upload</button>
      </form>
    </div>
  );
}
