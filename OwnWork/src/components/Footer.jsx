import { useState, useEffect } from "react";
import { GetFooter, PostNewsSubscription } from "./API";
import { Link } from "react-scroll";
import Nav from "react-bootstrap/Nav";
import logo from "../imgs/logo.png";
import {
  RiFacebookFill,
  RiTwitterFill,
  RiVimeoFill,
  RiInstagramFill,
} from "react-icons/ri";

const Footer = () => {
  const [footerData, setFooterData] = useState([]);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const response = await GetFooter();
        setFooterData(response);
        setToggle(!toggle);
      } catch (error) {
        console.log("Footer error:", error);
        setError(error);
      }
    };
    fetchFooter();
  }, [toggle]);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    const NewsLetterData = {
      email,
      name,
    };
    await PostNewsSubscription(NewsLetterData);
    setName("");
    setEmail("");
  };

  return (
    <div className="new-white-bg footer mt-5 ">
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="container">
        <div className="d-flex justify-content-center align-items-center">
          <img
            src={logo}
            alt="Butterfly logo"
            className="mb-2 img-fluid mt-3"
          />
        </div>
        <div className="row txt-small mt-4 ">
          {/* Contact Us */}
          <div className="col-lg-4 me-2 d-md-flex d-sm-flex flex-column align-items-md-center align-items-sm-center">
            <h4>Contact Us</h4>
            <p>
              Address: {footerData.address}, {footerData.zipncity}
            </p>
            <p>Phone: +45 {footerData.phone}</p>
            <p>Email: {footerData.email}</p>
            <p>CVR: {footerData.cvr}</p>
            <p>Opening hours: {footerData.openinghours}</p>
          </div>
          {/* Social Media */}
          <div className="col-lg-2 d-md-flex d-sm-flex flex-column align-items-md-center align-items-sm-center">
            <h4>Follow Us</h4>
            <a href="#facebook" className="d-flex HoverPink">
              <RiFacebookFill className="mt-1" />
              <p className="ms-2">Facebook</p>
            </a>
            <a href="#twitter" className="d-flex HoverPink">
              <RiTwitterFill className="mt-1" />
              <p className="ms-2">Twitter</p>
            </a>
            <a href="#vimeo" className="d-flex HoverPink">
              <RiVimeoFill className="mt-1" />
              <p className="ms-2">Vimeo</p>
            </a>
            <a href="#instagram" className="d-flex HoverPink">
              <RiInstagramFill className="mt-1" />
              <p className="ms-2">Instagram</p>
            </a>
          </div>
          {/* Links */}
          <div className="col-lg-2 me-5 d-md-flex d-sm-flex flex-column align-items-md-center align-items-sm-center">
            <h4>Link</h4>
            <Nav.Link className="HoverPink">
              <p>HOME</p>
            </Nav.Link>
            <Nav.Link
              to="about"
              as={Link}
              smooth={true}
              duration={500}
              className="Pointer me-5 text-black HoverPink ms-5"
            >
              <p>ABOUT</p>
            </Nav.Link>
            <Nav.Link className="HoverPink">
              <p>FEATURE</p>
            </Nav.Link>
            <Nav.Link className="HoverPink">
              <p>SERVICE</p>
            </Nav.Link>
            <Nav.Link className="HoverPink">
              <p>CONTACT</p>
            </Nav.Link>
          </div>
          {/* Newsletter */}
          <div className="col-lg-3 d-md-flex d-sm-flex flex-column align-items-md-center align-items-sm-center">
            <h4>Newsletter</h4>
            <p>Sign up for our newsletter</p>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-100 mb-2 input-grey"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-100 mb-2 input-grey"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="w-50 btn btn-pink btn-round mb-3"
              onClick={handleSubscribe}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
