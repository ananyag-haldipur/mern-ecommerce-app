import { Link, useNavigate } from "react-router-dom";
import { logoutUser, getCurrentUser } from "../services/authService";

function Navbar() {
  const navigate = useNavigate();

  const user = getCurrentUser();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/">
          🛒 MERN Shop
        </Link>

        <div className="navbar-nav ms-auto">

          <Link className="nav-link" to="/">
            🏠 Home
          </Link>

          {user && (
            <>
              <Link className="nav-link" to="/cart">
                🛒 Cart
              </Link>

              <Link className="nav-link" to="/orders">
                📦 My Orders
              </Link>

              {user.role === "admin" && (
                <Link className="nav-link" to="/admin">
                  ⚙ Admin
                </Link>
              )}

              <span className="nav-link text-warning">
                👋 {user.name}
              </span>

              <button
                className="btn btn-danger btn-sm ms-2"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}

          {!user && (
            <>
              <Link className="nav-link" to="/login">
                Login
              </Link>

              <Link className="nav-link" to="/register">
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;