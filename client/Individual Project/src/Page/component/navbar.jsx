import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


export default function Navbar() {
  const navigate = useNavigate();

  // Get role from localStorage (case-insensitive)
  const role = (localStorage.getItem("role") || '').toLowerCase();

  const handleAdminClick = () => {
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
    <nav
      style={{
        width: "100%",
        background: "#E6F2F7",
        padding: "0",
        borderBottom: "2px solid #AFCCD3",
        fontFamily: "Georgia, Times New Roman, Times, serif",
        boxShadow: "0 2px 12px 0 rgba(94, 123, 129, 0.07)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          height: 68,
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 22, color: "#5E7B81", letterSpacing: 1 }}>
          {/* Logo atau judul */}
          Music Store
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          {role === "admin" && (
            <>
              <button
                onClick={handleAdminClick}
                style={{
                  background: "none",
                  border: "1.5px solid #5E7B81",
                  color: "#5E7B81",
                  borderRadius: 6,
                  padding: "7px 18px",
                  fontWeight: 600,
                  fontSize: 16,
                  marginRight: 8,
                  cursor: "pointer",
                  transition: "background 0.2s, color 0.2s",
                }}
                onMouseOver={e => { e.currentTarget.style.background = '#5E7B81'; e.currentTarget.style.color = '#fff'; }}
                onMouseOut={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#5E7B81'; }}
              >
                Admin Only
              </button>
              <Link
                to="/orders"
                style={{
                  background: "none",
                  border: "1.5px solid #5E7B81",
                  color: "#5E7B81",
                  borderRadius: 6,
                  padding: "7px 18px",
                  fontWeight: 600,
                  fontSize: 16,
                  marginRight: 16,
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "background 0.2s, color 0.2s",
                }}
                onMouseOver={e => { e.currentTarget.style.background = '#5E7B81'; e.currentTarget.style.color = '#fff'; }}
                onMouseOut={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#5E7B81'; }}
              >
                Orders
              </Link>
            </>
          )}
          <Link
            to="/"
            style={{
              background: "none",
              border: "1.5px solid #5E7B81",
              color: "#5E7B81",
              borderRadius: 6,
              padding: "7px 18px",
              fontWeight: 600,
              fontSize: 16,
              marginRight: 8,
              textDecoration: "none",
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseOver={e => { e.currentTarget.style.background = '#5E7B81'; e.currentTarget.style.color = '#fff'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#5E7B81'; }}
          >
            Home
          </Link>
          <Link
            to="/cart"
            style={{
              background: "none",
              border: "1.5px solid #5E7B81",
              color: "#5E7B81",
              borderRadius: 6,
              padding: "7px 18px",
              fontWeight: 600,
              fontSize: 16,
              marginRight: 16,
              textDecoration: "none",
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseOver={e => { e.currentTarget.style.background = '#5E7B81'; e.currentTarget.style.color = '#fff'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#5E7B81'; }}
          >
            Cart
          </Link>
          <button
            onClick={logout}
            style={{
              background: "none",
              border: "1.5px solid #F08080",
              color: "#F08080",
              borderRadius: 6,
              padding: "7px 18px",
              fontWeight: 600,
              fontSize: 16,
              marginLeft: 0,
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseOver={e => { e.currentTarget.style.background = '#F08080'; e.currentTarget.style.color = '#fff'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#F08080'; }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}