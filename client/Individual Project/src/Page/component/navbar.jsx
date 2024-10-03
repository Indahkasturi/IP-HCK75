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
        <button className="btn btn-primary"><Link to={`/`}>Home</Link></button>
        <Link to={`/cart`}> </Link>
        <button
          onClick={logout}
          className="btn btn-danger"
        >
          Logout
        </button>
      </nav>
    </section>
  );
}
