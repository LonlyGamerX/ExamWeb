import { useEffect, useState } from "react";
import { GetTreatment } from "../components/API";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import butterfly from "../imgs/butterfly.png";

const Service = () => {
  const [treatment, setTreatment] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState(null);

  useEffect(() => {
    const fetchTreatment = async () => {
      try {
        const treatment = await GetTreatment();
        setTreatment(treatment);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTreatment();
  }, []);

  const openModal = (treatment) => {
    setSelectedTreatment(treatment);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <img src={butterfly} alt="butterfly" className="img-fluid" />
      </div>
      <h1 className="text-center d-flex justify-content-center mb-3">
        Our Services
      </h1>
      <Container className="mt-5">
        {treatment.map((item, index) => (
          <div className="row align-items-center mb-3 BorderSet" key={index}>
            <div className="col-lg-4 ps-0 pe-0">
              <img
                src={`http://localhost:5029/images/treatment/${item.image}`}
                alt={item.title}
                className="img-fluid w-lg-75"
              />
            </div>
            <div className="col-lg-4">
              <h3>{item.title}</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: item.content.slice(0, 150) + "...",
                }}
              />
            </div>
            <div className="col-lg-4 d-flex align-items-center justify-content-center">
              <button
                className="btn btn-pink btn-round btn-squard"
                onClick={() => openModal(item)}
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </Container>
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="modal-content-service">
            <div className="row">
              <div className="col-lg-4">
                <img
                  src={`http://localhost:5029/images/treatment/${selectedTreatment?.image}`}
                  alt={selectedTreatment?.title}
                  className="img-fluid"
                />
              </div>
              <div className="col-lg-6">
                <h2 className="mb-3">{selectedTreatment?.title}</h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: selectedTreatment?.content,
                  }}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Service;
