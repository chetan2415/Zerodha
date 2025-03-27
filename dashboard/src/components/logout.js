import { useEffect } from "react";

function Logout() {
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "https://zerodha-frontend-app.onrender.com";
  }, []);

  return null;
}

export default Logout;
