import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../imgs/logo.png";
import Container from "react-bootstrap/Container";

function AdminNavigation() {
  return (
    <>
      <Container>
        <Navbar className="navbar" expand="lg">
          <img src={logo} alt="Butterfly logo" className="mb-2 img-fluid" />
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-center">
            <Nav>
              <Nav.Link href="/admin/dashboard" className="me-5 text-black">
                Dashboard
              </Nav.Link>
              <Nav.Link href="/admin/users" className="me-5 text-black">
                Users
              </Nav.Link>
              <Nav.Link href="/" className="me-5 text-black">
                Home
              </Nav.Link>
              <Nav.Link href="/logout" className="me-5 text-black">
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </>
  );
}

export default AdminNavigation;
