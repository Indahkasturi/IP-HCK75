import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) =>{
        try {
             e.preventDefault()
             const {data} = await axios({
                method: 'post',
                url: 'localhost:3000/login',
                data: {
                  email,
                  password
                }
            })
            localStorage.setItem("access_token", data.access_token)
            navigate('/')
        } catch (error) {
            console.log(error.response);
            
        }  
    }
  return (
    <>
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
    </>
  );
}
