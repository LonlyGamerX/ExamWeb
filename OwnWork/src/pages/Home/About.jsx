import butterfly from "../../imgs/butterfly.png";
import { useNavigate } from "react-router-dom";

const About = ({ about }) => {
  const navigation = useNavigate();

  const handleClick = () => { 
    navigation("/feature");
  };

  return (
    <div id="about" className="aboutPosition">
      {about && (
        <div className="d-flex flex-column align-items-center">
          <img src={butterfly} alt="butterfly" className="img-fluid mb-3" />
          <h6 className="txt-grey">ABOUT OUR SPA CENTER</h6>
          <h1>{about.title}</h1>
          <div
            className="w-52 txt-aligntment txt-grey mb-3"
            dangerouslySetInnerHTML={{ __html: about.content }}
          />
          <button className="mb-5 mt-5 mt-md-3 mt-sm-2 btn btn-pink btn-round" onClick={handleClick}>
            Read More
          </button>
        </div>
      )}
    </div>
  );
};

export default About;
