import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "../components/API";
import Cookies from "js-cookie";
import Form from "react-bootstrap/Form";
import butterfly from "../imgs/butterfly.png";

const LoginUser = ({ setIsAdmin, setUser: setUserRem }) => {
  const userRef = useRef();
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await Login(user, pwd);
    const { status, data } = response;
    console.log("L" + status);
    switch (status) {
      case 200:
        const name = data?.name; // getting name of user
        const admin = data?.admin; // getting admin role to see if a user is admin or not (true or false)
        setIsAdmin(admin);
        setUserRem(user);
        setUser("");
        setPwd("");

        // Store login information in cookies
        Cookies.set("user", user, { expires: 1 }); // Expires after 1 day
        Cookies.set("name", name, { expires: 1 }); // Expires after 1 day
        Cookies.set("admin", admin, { expires: 1 }); // Expires after 1 day
        navigate("/admin/dashboard");
        break;
      case 400:
        setErrorMsg("Error 400: Bad Request");
        console.log("Error 400\r\nBad Request");
        break;
      case 401:
        setErrorMsg("Error 401: Unauthorized");
        console.log("Error 401\r\nUnauthorized");
        break;
      case 403:
        setErrorMsg("Error 403: Forbidden");
        console.log("Error 403\r\nForbidden");
        break;
      case 404:
        setErrorMsg("Error 404: Not Found");
        console.log("Error 404\r\nNot Found");
        break;
      case 500:
        setErrorMsg("Internal Server Error");
        console.log("Internal Server Error");
        break;
      default:
        setErrorMsg("Login Failed: Unknown Error");
        console.log("Login Failed\r\nUnknown Error");
        break;
    }
  };

  return (
    <>
      <section className="mt-5 container">
        {errorMsg && (
          <p
            ref={userRef}
            className="alert alert-danger w-25"
            aria-live="assertive"
          >
            {errorMsg}
          </p>
        )}
        <div className="d-flex flex-lg-column align-items-center justify-content-center">
          <img src={butterfly} alt="butterfly" className="img-fluid" />
          <h1 className="mb-3">Login</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                id="email"
                className="input-grey mt-2"
                placeholder="Enter your email"
                ref={userRef}
                autoComplete="true"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                placeholder="Enter your password"
                type="password"
                id="password"
                autoComplete="off"
                className="input-grey"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              />
            </Form.Group>
            <button className="btn btn-pink btn-round w-100" type="submit">
              Login
            </button>
          </Form>
        </div>
      </section>
    </>
  );
};

export default LoginUser;
