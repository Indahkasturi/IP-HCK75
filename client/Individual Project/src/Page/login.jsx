import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

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
    localStorage.setItem("access_token", data.access_token)
    localStorage.setItem("role", data.role);
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
      // console.log(data);
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("role", data.role)
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Email or Password failed",
      });
    }
  };
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#AFCCD3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Georgia', 'Times New Roman', Times, serif",
      }}
    >
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "6px",
          boxShadow: "0 2px 8px 0 rgba(125, 171, 183, 0.10)",
          padding: "36px 28px 28px 28px",
          width: "100%",
          maxWidth: "370px",
          border: "2px solid #7DABB7",
        }}
      >
        <h2
          style={{
            color: "#5E7B81",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: "22px",
            fontFamily: "'Georgia', 'Times New Roman', Times, serif",
            fontSize: 28,
            letterSpacing: 0.5,
          }}
        >
          Login
        </h2>
        <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "16px" }}>
          <label
            htmlFor="exampleInputEmail1"
            style={{ color: "#5E7B81", fontWeight: 600, marginBottom: 4, display: "block", fontFamily: "'Georgia', serif", fontSize: 15 }}
          >
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              border: "1px solid #7DABB7",
              borderRadius: "4px",
              padding: "9px 11px",
              width: "100%",
              background: "#FFFFFF",
              color: "#000000",
              fontSize: "1rem",
              outline: "none",
              marginTop: 2,
              fontFamily: "'Georgia', serif",
            }}
          />
        </div>
        <div style={{ marginBottom: "18px" }}>
          <label
            htmlFor="exampleInputPassword1"
            style={{ color: "#5E7B81", fontWeight: 600, marginBottom: 4, display: "block", fontFamily: "'Georgia', serif", fontSize: 15 }}
          >
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              border: "1px solid #7DABB7",
              borderRadius: "4px",
              padding: "9px 11px",
              width: "100%",
              background: "#FFFFFF",
              color: "#000000",
              fontSize: "1rem",
              outline: "none",
              marginTop: 2,
              fontFamily: "'Georgia', serif",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            background: "#7DABB7",
            color: "#fff",
            fontWeight: 600,
            border: "1px solid #7DABB7",
            borderRadius: "4px",
            padding: "10px 0",
            fontSize: "1.05rem",
            marginBottom: "12px",
            fontFamily: "'Georgia', serif",
            letterSpacing: 0.5,
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onMouseOver={e => e.currentTarget.style.background = '#51696E'}
          onMouseOut={e => e.currentTarget.style.background = '#7DABB7'}
        >
          Login
        </button>
        </form>
        <div style={{ textAlign: "center", marginBottom: "14px" }}>
          <span style={{ color: "#51696E", fontWeight: 500, fontFamily: "'Georgia', serif", fontSize: 15 }}>Don't have an account?</span>
          <Link
            to={"/register"}
            style={{
              color: "#51696E",
              fontWeight: 600,
              marginLeft: 8,
              textDecoration: "underline",
              fontFamily: "'Georgia', serif",
              fontSize: 15,
              transition: "color 0.2s",
            }}
          >
            Register
          </Link>
        </div>
        <div style={{ display: "flex", alignItems: "center", margin: "14px 0" }}>
          <div style={{ flex: 1, height: 1, background: "#718C93" }} />
          <span style={{ margin: "0 12px", color: "#718C93", fontWeight: 500, fontSize: 14, fontFamily: "'Georgia', serif" }}>or</span>
          <div style={{ flex: 1, height: 1, background: "#718C93" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <GoogleOAuthProvider clientId="668932031752-9bs83rklhd5sdthbnod9buhvt4t5j24t.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={responseGoogle}
              onError={() => {
                console.log("Login Failed");
              }}
              width="100%"
              theme="filled_blue"
              shape="pill"
              text="continue_with"
            />
          </GoogleOAuthProvider>
        </div>
      </div>
    </div>
  );
}
