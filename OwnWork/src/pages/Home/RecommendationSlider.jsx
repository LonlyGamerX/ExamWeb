import Carousel from "react-bootstrap/Carousel";
import quote from "../../imgs/quote.png";

const RecommendationSlider = ({ recommendation }) => {
  return (
    <div className="new-white-bg mt-5 col-lg-12">
      <Carousel>
        {recommendation.map((item, index) => (
          <Carousel.Item key={index}>
            <div className="carousel-item-content">
              <section className="col-lg-12 text-center">
                <img src={quote} alt="Quote" className="img-fluid mb-5 mt-5" />
              </section>
              <section className="col-lg-12 d-flex align-items-center justify-content-center">
                <p className="w-50 mb-3 text-center">{item.content}</p>
              </section>
              <section className="col-lg-12">
                <img
                  src={`http://localhost:5029/images/recommendation/${item.image}`}
                  alt="Circle"
                  className="thumb-img mb-3 mx-auto d-block"
                />
              </section>
              <div className="d-flex mb-5 justify-content-center">
                <p className="name">{item.name},&nbsp;</p>
                <p className="title">{item.title}</p>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default RecommendationSlider;
