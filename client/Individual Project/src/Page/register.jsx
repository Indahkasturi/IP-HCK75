import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


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
                url: 'localhost:3000/register',
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
    <section>
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
      <div className="form-group">
        <label htmlFor="exampleInputRole1">Role</label>
        <input
          type="Role"
          className="form-control"
          id="exampleInputRole1"
          placeholder="Role"
          value={role} 
          onChange={(e)=> setRole(e.target.value)} 
        />
      </div>
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Check me out
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  </section>
  )
}