import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Navbar() {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    const role = localStorage.getItem("role");
    console.log("User role:", role); // Add logging to check the role
    if (role !== "admin") {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "You do not have permission to access this page.",
      });
    } else {
      navigate("/admin");
    }
  };

  const logout = async () => {
    try {
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <section>
      <nav className="navbar navbar-light bg-light">
        <button className="btn btn-outline-primary" onClick={handleAdminClick}>
          Admin Only
        </button>
        <div>
          <button className="btn btn-outline-primary">
            <Link to={`/`}>Home</Link>
          </button>
          <button className="btn btn-outline-primary">
            <Link to={`/cart`}>Cart</Link>
          </button>
        </div>
        <button onClick={logout} className="btn btn-outline-danger">
          Logout
        </button>
      </nav>
    </section>
  );
}