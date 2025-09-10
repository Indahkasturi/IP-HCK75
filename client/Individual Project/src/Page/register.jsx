
import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'


export default function Register() {
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[role, setRole] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
            await axios({
                method: 'post',
                url: 'http://localhost:3000/register',
                data: {
                    email,
                    password,
                    role
                }
            })
            navigate('/login')
        } catch (error) {
            console.error(error.response)
            Swal.fire({
                icon: "error",
                text: error.response?.data?.message  || error.message
              });
            
        }
    }
    
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
                    Register
                </h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "16px" }}>
                        <label
                            htmlFor="exampleInputEmail1"
                            style={{ color: "#5E7B81", fontWeight: 600, marginBottom: 4, display: "block", fontFamily: "'Georgia', serif", fontSize: 15 }}
                        >
                            Email address
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
                    <div style={{ marginBottom: "16px" }}>
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
                    <div style={{ marginBottom: "16px" }}>
                        <label
                            htmlFor="exampleInputRole1"
                            style={{ color: "#5E7B81", fontWeight: 600, marginBottom: 4, display: "block", fontFamily: "'Georgia', serif", fontSize: 15 }}
                        >
                            Role
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputRole1"
                            placeholder="User"
                            defaultValue="user"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
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
                        Submit
                    </button>
                    <div style={{ textAlign: "center", marginBottom: "14px" }}>
                        <span style={{ color: "#51696E", fontWeight: 500, fontFamily: "'Georgia', serif", fontSize: 15 }}>Already have an account?</span>
                        <Link
                            to={'/login'}
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
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}