import { Link, useNavigate } from "react-router-dom";
import Home from "../home";

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
        <Link to={`/`}>Home</Link>
        <Link to={`/cart`}>Cart</Link>
        <button
          onClick={logout}
          className="btn bg-red-600 text-white hover:bg-red-500"
        >
          Logout
        </button>
      </nav>
    </section>
  );
}
