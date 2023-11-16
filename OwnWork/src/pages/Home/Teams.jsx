import Card from "react-bootstrap/Card";

const Teams = ({ team }) => {
  return (
    <>
      <div className="w-75 TeamsCard row d-flex justify-content-center align-items-center">
        {team.map((item, index) => (
          <div className="col-lg-3 mb-2" key={index}>
            <Card className="borderHide h-100 text-center">
              <div className="position-relative">
                <Card.Img
                  variant="top"
                  className="img-fluid mx-auto mt-5"
                  src={`http://localhost:5029/images/team/${item.image}`}
                />
                <Card.Body className="CardTxtLocation shadow-lg bg-white z-1">
                  <Card.Title className="name">
                    {item.firstname} {item.lastname}
                  </Card.Title>
                  <Card.Text className="txt-small">{item.role}</Card.Text>
                </Card.Body>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
};

export default Teams;
