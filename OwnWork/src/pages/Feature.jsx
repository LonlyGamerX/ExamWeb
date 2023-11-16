import Container from "react-bootstrap/Container";
import butterfly from "../imgs/butterfly.png";
import Card from "react-bootstrap/Card";
import appointment from "../imgs/appointment-img.jpg";
import OpenHouse from "../imgs/3.jpg";
import MegaSale from "../imgs/1.jpg";
import leaf from "../imgs/leaf.png";

const Feature = () => {
  return (
    <>
      <div className="d-flex justify-content-center">
        <img src={butterfly} alt="butterfly" className="img-fluid" />
      </div>
      <h1 className="text-center d-flex justify-content-center mb-3">
        Our Features
      </h1>
      <Container className="mt-5">
        <h2 className="border-pink-line w-50">Upcoming events</h2>
        <div className="row">
          <div className="col-lg-3">
            <Card>
              <Card.Img
                variant="top"
                src={appointment}
                className="img-fluid"
                alt="appointment"
              />
              <Card.Body>
                <Card.Title className="mb-2">Testing new service</Card.Title>
                <Card.Text className="text-black-50">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatibus, quibusdam.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-3">
            <Card>
              <Card.Img
                variant="top"
                src={OpenHouse}
                className="img-fluid"
                alt="OpenHouse"
              />
              <Card.Body>
                <Card.Title className="mb-2">Open House</Card.Title>
                <Card.Text className="text-black-50">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatibus, quibusdam.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-3">
            <Card>
              <Card.Img
                variant="top"
                src={MegaSale}
                className="img-fluid"
                alt="MegaSale"
              />
              <Card.Body>
                <Card.Title className="mb-2">Mega sale</Card.Title>
                <Card.Text className="text-black-50">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatibus, quibusdam.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
        <img src={leaf} alt="leaf" className="img-fluid Jasmine2" />
      </Container>
    </>
  );
};

export default Feature;
