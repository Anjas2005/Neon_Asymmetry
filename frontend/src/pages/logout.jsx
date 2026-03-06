import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear tokens / any auth state
    localStorage.clear();

    // Redirect to login
    navigate("/login", { replace: true });
  }, [navigate]);

  return null; // Nothing to render
}

export default Logout;
