import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Logout as logoutAPI } from "./API";

const Logout = () => {
  const navigation = useNavigate();

  useEffect(() => {
    const logout = async () => {
      // Call the API to delete the cookie on the server side
      await logoutAPI();

      // Clear the authentication cookies
      Cookies.remove("user");
      Cookies.remove("name");
      Cookies.remove("admin");

      // Redirect to the home page
      navigation("/");
    };

    logout();
  }, [navigation]);

  return null; // or you can render a loading indicator if needed
};

export default Logout;
