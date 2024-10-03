import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

 
    const responseGoogle = async (response) => {
      console.log(response, "....");
      const googleToken = response.credential; // Menggunakan GIS, token akan berada di `credential`
      
      const result = await fetch('http://localhost:3000/loginGoogle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          googleToken
        }),
      });
      const data = await result.json();
      console.log(data, '<<<<<');
      localStorage.setItem("access_token", data.access_token)
            navigate('/')
    };
    
    
    const handleSubmit = async (e) =>{
        try {
          
             e.preventDefault()
             const {data} = await axios({
                method: 'post',
                url: 'http://localhost:3000/login',
                data: {
                  email,
                  password
                }
            })
            console.log(data);
            
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
      </section>
    </>
  );
}
