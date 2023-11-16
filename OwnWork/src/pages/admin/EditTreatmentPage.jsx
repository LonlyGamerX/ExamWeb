import { useState, useEffect } from "react";
import { GetTreatment, EditTreatment } from "../../components/API";
import Container from "react-bootstrap/Container";
import butterfly from "../../imgs/butterfly.png";
import Modal from "react-bootstrap/Modal";
import ReactQuill from "react-quill";
import Form from "react-bootstrap/Form";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const EditTreatmentPage = () => {
  const [treatment, setTreatment] = useState([]);
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editTreatmentTitle, setEditTreatmentTitle] = useState("");
  const [editTreatmentContent, setEditTreatmentContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [toggle, setToggle] = useState(false);

  const admin = Cookies.get("admin");
  const user = Cookies.get("user");
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchTreatment = async () => {
      try {
        const response = await GetTreatment();
        setTreatment(response);
      } catch (error) {
        console.log("Treatment error:", error);
      }
    };

    fetchTreatment();
  }, [toggle]);

  const openModal = (treatment) => {
    setSelectedTreatment(treatment);
    setShowModal(true);
    setEditTreatmentTitle(treatment.title);
    setEditTreatmentContent(treatment.content);
    setSelectedImage(null);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleEditTreatment = async (e) => {
    e.preventDefault();
    const treatmentDataEdit = {
      title: editTreatmentTitle,
      content: editTreatmentContent,
      image: selectedImage,
    };
    try {
      await EditTreatment(selectedTreatment._id, treatmentDataEdit);
      closeModal();
      setToggle(!toggle);
      // You may also need to update the treatment data in the state if required
    } catch (error) {
      console.log("Edit Treatment error:", error);
    }
  };

  return (
    <>
      <div className="mt-5 d-flex justify-content-center">
        <img src={butterfly} alt="butterfly" className="butterfly" />
      </div>
      <h1 className="text-center mb-5">Edit Treatment</h1>
      <Container>
        {treatment &&
          treatment.map((item, index) => (
            <div className="row align-items-center mb-3 BorderSet" key={index}>
              <div className="col-lg-4 ps-0 pe-0">
                <img
                  src={`http://localhost:5029/images/treatment/${item.image}`}
                  alt={item.title}
                  className="img-fluid w-lg-75"
                />
              </div>
              <div className="col-lg-6">
                <h3>{item.title}</h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.content,
                  }}
                />
              </div>
              <div className="col-lg-2 d-flex align-items-center justify-content-center">
                <button
                  onClick={() => openModal(item)}
                  className="btn btn-pink btn-round btn-squard"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
      </Container>
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Treatment: {selectedTreatment?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                value={editTreatmentTitle}
                placeholder="Please enter a title..."
                onChange={(e) => setEditTreatmentTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <ReactQuill
                onChange={(content) => setEditTreatmentContent(content)}
                placeholder="Please enter your text here..."
                value={editTreatmentContent}
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
          <button className="btn btn-pink btn-round" onClick={closeModal}>
            Close
          </button>
          <button
            className="btn btn-pink btn-round w-25"
            onClick={handleEditTreatment}
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditTreatmentPage;
