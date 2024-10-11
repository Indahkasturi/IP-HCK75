import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const responseGoogle = async (response) => {
    // console.log(response, "....");
    const googleToken = response.credential; 

    const result = await fetch("http://localhost:3000/loginGoogle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        googleToken,
      }),
    });
    const data = await result.json();
    // console.log(data, "<<<<<");
    localStorage.setItem("access_token", data.access_token);
    navigate("/");
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios({
        method: "post",
        url: "http://localhost:3000/login",
        data: {
          email,
          password,
        },
      });
      console.log(data);

      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Email or Password failed",

      });
    }
  };
  return (
    <>
      <section
        className="container mt-5"
        style={{
          backgroundImage: "url('./assets/1.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="border p-4 rounded shadow"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            width: "400px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2 className="text-center">Login</h2>
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="form-group mb-3">
              <label htmlFor="exampleInputEmail1">Email</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required

              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required

              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{ borderRadius: "5px" }}
            >
              Submit
            </button>
            <button style={{marginTop : '15px', marginLeft : '39%'}} className="btn btn-outline-primary">
              <Link to={"/register"}>Register</Link>
            </button>
          </form>

          <div className="d-flex justify-content-center mb-3">
            <GoogleOAuthProvider clientId="668932031752-9bs83rklhd5sdthbnod9buhvt4t5j24t.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={responseGoogle}
                onError={() => {
                  console.log("Login Failed");
                }}
                style={{ width: "100%", borderRadius: "5px" }}
              />
            </GoogleOAuthProvider>
          </div>
        </div>
      </section>
      {/* <section>
        <form onSubmit={handleSubmit} >
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email"
              value={email} 
              onChange={(e)=> setEmail(e.target.value)}
            />
            <small id="emailHelp" className="form-text text-muted"></small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              value={password} 
              onChange={(e)=> setPassword(e.target.value)}
            />
          </div>
   
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <div>
        <GoogleOAuthProvider clientId="668932031752-9bs83rklhd5sdthbnod9buhvt4t5j24t.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={responseGoogle}
        onError={() => {
          console.log('Login Failed');
        }}
      />
       </GoogleOAuthProvider>
    </div>
      </section> */}
    </>
  );
}
