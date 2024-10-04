import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"


export default function Register() {
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[role, setRole] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) =>{
        try {
            e.preventDefault()
            await axios({
                methode: 'post',
                url: 'http://localhost:3000/register',
                data: {
                    email,
                    password,
                    role
                }
            })
            navigate('/register')
        } catch (error) {
            console.log(error.response.data);
            
        }
    }
    
  return (
    <section
    className="container mt-5"
    style={{
        backgroundImage: "url('https://files.oaiusercontent.com/file-0jBlFHo0sofmj2L5GiZppt0X?se=2024-10-03T19%3A28%3A26Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D70df77e4-6f05-4f55-b5b7-dd0893e3a316.webp&sig=PKRWqNYGQ6Wv2RJavCQMvaNJHjYIOERYRh8j8k4KYrk%3D')",
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
                    placeholder="Role"
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