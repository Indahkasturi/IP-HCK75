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
            Swal.fire({
                icon: "error",
                text: "Something went wrong!",
              });
            
        }
    }
    
  return (
    <section
    className="container mt-5"
    style={{
        backgroundImage: "url('https://files.oaiusercontent.com/file-o22B58Q0C9pvbf7Ie3bV0LKd?se=2024-10-04T08%3A22%3A35Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D10c648cb-02ae-493a-b6f5-e82b1793a4cc.webp&sig=8uDzeZ9/SWXDFtMip5ueAai9peBr7MErmXuD0oVi4tY%3D')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }}
>
    <div className="border p-5 rounded shadow" style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
        width: '400px', 
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    }}>
        <h2 className="text-center">Register</h2>
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="form-group mb-3">
                <label htmlFor="exampleInputEmail1">Email address</label>
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
            <div className="form-group mb-3">
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
            <div className="form-group mb-3">
                <label htmlFor="exampleInputRole1">Role</label>
                <input
                    type="text"
                    className="form-control"
                    id="exampleInputRole1"
                    placeholder="User"
                    defaultValue="user"
                    value={role}
                    onChange={(e) => setRole(e.target.value)} 
                    required
                />
            </div>

            <button type="submit" className="btn btn-primary w-100" style={{marginBottom: '10px'}}>
                Submit
            </button>
            <button style={{marginLeft :'40%'}} className="btn btn-outline-primary"><Link to={'/login'} >Login</Link></button>
        </form>
    </div>
</section>
  )
}