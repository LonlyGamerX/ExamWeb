import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../imgs/logo.png";
import Container from "react-bootstrap/Container";
import { Link } from "react-scroll";

function Navigation() {
  return (
    <>
      <Container>
        <Navbar className="navbar" expand="lg">
          <img src={logo} alt="Butterfly logo" className="mb-2 img-fluid" />
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-center">
            <Nav>
              <Nav.Link href="/" className="me-5 text-black">
                HOME
              </Nav.Link>
              <Nav.Link
                to="about"
                as={Link}
                smooth={true}
                duration={500}
                offset={-50}
                className="Pointer me-5 text-black"
              >
                ABOUT
              </Nav.Link>
              <Nav.Link href="/feature" className="me-5 text-black">
                FEATURE
              </Nav.Link>
              <Nav.Link href="/service" className="me-5 text-black">
                SERVICE
              </Nav.Link>
              <Nav.Link href="/contact" className="me-5 text-black">
                CONTACT
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </>
  );
}

export default Navigation;
