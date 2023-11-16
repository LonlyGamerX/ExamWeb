import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import butterfly from "../../imgs/butterfly.png";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ReactQuill from "react-quill";
import {
  EditFooter,
  EditAbout,
  GetAbout,
  GetFooter,
  CreateTreatment,
} from "../../components/API";

const Dashboard = () => {
  const navigate = useNavigate();
  const admin = Cookies.get("admin");
  const user = Cookies.get("user");
  const name = Cookies.get("name");

  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showFooterModal, setShowFooterModal] = useState(false);
  const [showTreatmentModal, setShowTreatmentModal] = useState(false);
  const [aboutTitle, setAboutTitle] = useState("");
  const [aboutContent, setAboutContent] = useState("");
  const [treatmentTitle, setTreatmentTitle] = useState("");
  const [treatmentContent, setTreatmentContent] = useState("");
  const [footerData, setFooterData] = useState({
    name: "",
    cvr: "",
    address: "",
    zipncity: "",
    phone: "",
    email: "",
    openinghours: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);

  // UseEffect to check if user is logged in and has admin privileges
  useEffect(() => {
    const isLoggedIn = !!user;
    const isAdmin = !!admin;

    if (!isLoggedIn) {
      navigate("/login");
    }

    if (!isAdmin) {
      navigate("/notAdmin");
    }
  }, [navigate, user, admin]);

  // UseEffect to fetch the previous about data
  useEffect(() => {
    GetAbout()
      .then((response) => {
        setAboutTitle(response.title);
        setAboutContent(response.content);
      })
      .catch((error) => {
        console.error("Error fetching about data:", error);
      });
  }, []);

  // UseEffect to fetch the previous footer data
  useEffect(() => {
    GetFooter()
      .then((response) => {
        setFooterData(response);
      })
      .catch((error) => {
        console.error("Error fetching footer data:", error);
      });
  }, []);

  const handleAboutModalOpen = () => {
    setShowAboutModal(true);
  };

  const handleAboutModalClose = () => {
    setShowAboutModal(false);
  };

  const handleFooterModalOpen = () => {
    setShowFooterModal(true);
  };

  const handleFooterModalClose = () => {
    setShowFooterModal(false);
  };

  const handleTreatmentModalOpen = () => {
    setShowTreatmentModal(true);
  };

  const handleTreatmentModalClose = () => {
    setShowTreatmentModal(false);
  };

  const handleAboutSave = () => {
    const aboutData = {
      title: aboutTitle,
      content: aboutContent,
    };

    // Call the API to save the about data
    EditAbout(aboutData)
      .then((response) => {
        handleAboutModalClose();
      })
      .catch((error) => {
        // Handle error
        console.error("Error saving about data:", error);
      });
  };

  const handleFooterSave = () => {
    // Call the API to save the footer data
    EditFooter(footerData)
      .then((response) => {
        handleFooterModalClose();
      })
      .catch((error) => {
        console.error("Error saving footer data:", error);
      });
  };

  const handleTreatmentSave = () => {
    const treatmentData = {
      title: treatmentTitle,
      content: treatmentContent,
      image: selectedImage,
    };

    // Call the API to save the treatment data
    CreateTreatment(treatmentData)
      .then((response) => {
        handleTreatmentModalClose();
      })
      .catch((error) => {
        console.error("Error saving treatment data:", error);
      });
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <img src={butterfly} alt="butterfly" className="img-fluid" />
      </div>
      <h1 className="text-center mb-3">Welcome {name}</h1>
      <Container className="mt-5 d-flex justify-content-center flex-column align-items-center">
        <button
          className="btn btn-pink btn-round w-25 mb-2"
          onClick={handleTreatmentModalOpen}
        >
          Create Treatment
        </button>
        <a
          href="/admin/editTreatments"
          className="btn btn-pink btn-round w-25 mb-2"
        >
          Edit Treatment
        </a>
        <a
          href="/admin/deleteTreatments"
          className="btn btn-pink btn-round w-25 mb-2"
        >
          Delete Treatment
        </a>
        <button
          className="btn btn-pink btn-round w-25 mb-2"
          onClick={handleAboutModalOpen}
        >
          Edit About
        </button>
        <button
          className="btn btn-pink btn-round w-25 mb-2"
          onClick={handleFooterModalOpen}
        >
          Edit Footer
        </button>
      </Container>

      {/* About Modal */}
      <Modal show={showAboutModal} onHide={handleAboutModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit About</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="aboutTitle" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Title"
                value={aboutTitle}
                onChange={(e) => setAboutTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="aboutContent">
              <ReactQuill
                value={aboutContent}
                onChange={setAboutContent}
                placeholder="Content"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="justify-content-start">
          <button
            className="btn btn-pink btn-round"
            onClick={handleAboutModalClose}
          >
            Close
          </button>
          <button
            className="btn btn-pink btn-round w-25"
            onClick={handleAboutSave}
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>

      {/* Footer Modal */}
      <Modal show={showFooterModal} onHide={handleFooterModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Footer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="footerName" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Name"
                value={footerData.name}
                onChange={(e) =>
                  setFooterData({ ...footerData, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="footerCvr" className="mb-3">
              <Form.Control
                type="text"
                placeholder="CVR"
                value={footerData.cvr}
                onChange={(e) =>
                  setFooterData({ ...footerData, cvr: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="footerAddress" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Address"
                value={footerData.address}
                onChange={(e) =>
                  setFooterData({ ...footerData, address: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="footerZipCity" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Zip and City"
                value={footerData.zipncity}
                onChange={(e) =>
                  setFooterData({ ...footerData, zipncity: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="footerPhone" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Phone"
                value={footerData.phone}
                onChange={(e) =>
                  setFooterData({ ...footerData, phone: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="footerEmail" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Email"
                value={footerData.email}
                onChange={(e) =>
                  setFooterData({ ...footerData, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="footerOpeningHours">
              <Form.Control
                type="text"
                placeholder="Opening Hours"
                value={footerData.openinghours}
                onChange={(e) =>
                  setFooterData({ ...footerData, openinghours: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="justify-content-start">
          <button
            className="btn btn-pink btn-round"
            onClick={handleFooterModalClose}
          >
            Close
          </button>
          <button
            className="btn btn-pink btn-round w-25"
            onClick={handleFooterSave}
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>

      {/* Treatment */}
      <Modal show={showTreatmentModal} onHide={handleTreatmentModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Treatment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Please enter a title..."
                onChange={(e) => setTreatmentTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <ReactQuill
                onChange={(content) => setTreatmentContent(content)}
                placeholder="Please enter your text here..."
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedImage(e.target.files[0])}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="justify-content-start">
          <button
            className="btn btn-pink btn-round"
            onClick={handleTreatmentModalOpen}
          >
            Close
          </button>
          <button
            className="btn btn-pink btn-round w-25"
            onClick={handleTreatmentSave}
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
