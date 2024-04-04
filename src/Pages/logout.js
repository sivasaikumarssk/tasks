import { GoogleLogout } from "react-google-login";
import { useNavigate } from "react-router-dom";

const clientId =
  "937248963100-61kuo1sinu15sph83fqc1ub6npjn3vrq.apps.googleusercontent.com";

function Logout() {
  const navigate = useNavigate();

  const onSuccess = () => {
    localStorage.clear(); // Clear local storage
    console.log("Logout successfully");
    navigate("/"); // Redirect to home page or login page
  };

  const onFailure = (error) => {
    console.error("Logout failed:", error);
  };

  return (
    <div id="signOutButton">
      <GoogleLogout
        clientId={clientId}
        buttonText={"Logout"}
        onLogoutSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
}

export default Logout;
