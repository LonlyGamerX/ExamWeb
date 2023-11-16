const Treatment = ({ randomImages }) => {
  return (
    <>
      <div className="row">
        {randomImages.map((image, index) => (
          <a href="/service" className="col-lg-3 p-1 imgHover" key={index}>
            <img
              src={`http://localhost:5029/images/treatment/${image}`}
              alt={`Treatment ${index}`}
              className="img-fluid imgHover"
            />
          </a>
        ))}
      </div>
    </>
  );
};

export default Treatment;
