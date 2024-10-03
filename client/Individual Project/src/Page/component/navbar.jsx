import { Link, useNavigate } from "react-router-dom";



export default function Navbar() {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <section>
      <nav className="navbar navbar-light bg-light">
      <button className="btn btn-outline-primary"><Link to={`/admin`}> Admin Only </Link> </button>
        <div >
        <button className="btn btn-outline-primary"><Link to={`/`}>Home</Link></button>
        <button className="btn btn-outline-primary"><Link to={`/cart`}> Cart </Link> </button>
        </div>
        
        <button
          onClick={logout}
          className="btn btn-outline-danger"
        >
          Logout
        </button>
      </nav>
    </section>
  );
}
