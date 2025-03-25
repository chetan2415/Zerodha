import { useEffect } from "react";

function Logout() {
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "http://localhost:3000";
  }, []);

  return null;
}

export default Logout;
