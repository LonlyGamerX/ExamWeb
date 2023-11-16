import Card from "react-bootstrap/Card";

const PopularProcedures = ({ treatment }) => {
  return (
    <div className="treatmentCards">
      <div className="row d-flex justify-content-center ms-sm-5 ms-md-5">
        {treatment.slice(0, 3).map((item, index) => (
          <div className="col-lg-3 mb-2" key={index}>
            <Card className="w-75 h-100 m-0 text-center">
              <Card.Img
                variant="top"
                className="img-fluid w-75 mx-auto mt-5"
                src={`http://localhost:5029/images/treatment/${item.image}`}
              />
              <Card.Body>
                <Card.Title className="mb-4">{item.title}</Card.Title>
                <Card.Text
                  className="txt-grey"
                  dangerouslySetInnerHTML={{
                    __html: item.content.slice(0, 100),
                  }}
                />
                <a href="service" className="d-flex justify-content-center">
                  <button className="btn btn-black btn-round w-50">
                    Read More
                  </button>
                </a>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularProcedures;
