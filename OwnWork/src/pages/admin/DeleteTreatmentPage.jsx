import { useState, useEffect } from "react";
import butterfly from "../../imgs/butterfly.png";
import Container from "react-bootstrap/Container";
import { GetTreatment, DeleteTreatment } from "../../components/API";
import Modal from "react-bootstrap/Modal";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const DeleteTreatmentPage = () => {
  const [treatment, setTreatment] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [DeletionSuccess, setDeletionSuccess] = useState(false);

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
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDelete = async () => {
    try {
      await DeleteTreatment(selectedTreatment._id);
      setToggle(!toggle);
      closeModal();
      setDeletionSuccess(true);
    } catch (error) {
      console.log("Delete treatment error:", error);
    }
  };

  return (
    <>
      <div className="mt-5 d-flex justify-content-center">
        <img src={butterfly} alt="butterfly" className="butterfly" />
      </div>
      <h1 className="text-center mb-5">Delete Treatment</h1>
      <Container>
        {DeletionSuccess && (
          <div className="alert alert-success" role="alert">
            Treatment deleted successfully!
          </div>
        )}
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
                  Delete
                </button>
              </div>
            </div>
          ))}
      </Container>
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this treatment:
          {selectedTreatment && selectedTreatment.title}?
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={closeModal}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteTreatmentPage;
