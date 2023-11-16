import { useState, useEffect } from "react";
import {
  GetAbout,
  GetTreatment,
  GetRecommendationNum,
  GetTeams,
} from "../components/API";

// Components sections of Home
import About from "./Home/About";
import Treatment from "./Home/Treatment";
import PopularProcedures from "./Home/PopularProcedures";
import RecommendationSlider from "./Home/RecommendationSlider";
import Teams from "./Home/Teams";
import Appointment from "./Home/Appointment";

// Images & Icons
import leaf from "../imgs/leaf.png";
import spa from "../imgs/spa.png";
import chinarose from "../imgs/china-rose.png";
import jasmine from "../imgs/jasmine.png";

const Home = () => {
  const [aboutData, setAboutData] = useState([]);
  const [recommendationData, setRecommendationData] = useState([]);
  const [treatmentData, setTreatmentData] = useState([]);
  const [teamsData, setTeamsData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await GetAbout();
        setAboutData(response);
      } catch (error) {
        console.log("About error:", error);
        setError(error);
      }
    };

    fetchAbout();
  }, []);

  useEffect(() => {
    const fetchTreatment = async () => {
      try {
        const response = await GetTreatment();
        setTreatmentData(response);
      } catch (error) {
        console.log("Treatment error:", error);
        setError(error);
      }
    };

    fetchTreatment();
  }, []);

  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        const response = await GetRecommendationNum();
        setRecommendationData(response);
      } catch (error) {
        console.log("Recommendation error:", error);
        setError(error);
      }
    };

    fetchRecommendation();
  }, []);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await GetTeams();
        setTeamsData(response);
      } catch (error) {
        console.log("Teams error:", error);
        setError(error);
      }
    };

    fetchTeams();
  }, []);

  // Youtube popup
  const openVideoPopup = () => {
    setShowPopup(true);
  };

  const closeVideoPopup = () => {
    setShowPopup(false);
  };

  // Function to pick four random images from the treatment data
  const getRandomImages = () => {
    if (treatmentData.length <= 4) {
      return treatmentData.map((item) => item.image);
    } else {
      const randomIndexes = [];
      while (randomIndexes.length < 4) {
        const randomIndex = Math.floor(Math.random() * treatmentData.length);
        if (!randomIndexes.includes(randomIndex)) {
          randomIndexes.push(randomIndex);
        }
      }
      return randomIndexes.map((index) => treatmentData[index].image);
    }
  };

  const randomImages = getRandomImages();

  return (
    <>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row marginTop">
        <section className="col-lg-2">
          <img src={leaf} alt="leaf" className="img-fluid brushImg" />
        </section>
        <section className="col-lg-6 d-flex flex-column align-items-lg-baseline align-items-center">
          <h6 className="txt-pink px-small">SPA & BEAUTY CENTER</h6>
          <h1 className="txt-black">Beauty and success starts here.</h1>
          <p className="txt-black w-66">
            Together creeping heaven upon third dominion be upon won't darkness
            rule behold it create good saw after she'd Our set living
          </p>
          <div className="d-flex">
            <button className="btn btn-pink">RESERVE NOW</button>
            <button className="btn btn-play" onClick={openVideoPopup}>
              <p className="ms-3 mt-2">Watch our story</p>
            </button>
            {showPopup && (
              <div className="popup" onClick={closeVideoPopup}>
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube-nocookie.com/embed/tg9hNriQYTE"
                  title="SPA Youtube Video"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                ></iframe>
              </div>
            )}
          </div>
        </section>
        <section className="col-lg-4">
          <img src={spa} alt="spa" className="img-fluid image-placement" />
        </section>
      </div>
      <img src={chinarose} alt="chinarose" className="img-fluid chinaRose" />
      {/* About */}
      <About about={aboutData} />
      <img src={jasmine} alt="jasmin" className="img-fluid jasmine" />
      {/* Treatment */}
      <Treatment treatment={treatmentData} randomImages={randomImages} />
      <div className="mt-5 text-center">
        <div className="d-flex flex-column align-items-center">
          <h1 className="text-black mb-3">Popular Procedures</h1>
          <p className="txt-grey w-50">
            To doesn't his appear replenish together called he of mad place
            won't wherein blessed second every wherein were mean kind wherein
            and martcin
          </p>
        </div>
      </div>
      <PopularProcedures treatment={treatmentData} />
      {/* Recommendation Slider */}
      <RecommendationSlider recommendation={recommendationData} />
      {/* Teams */}
      <div className="mt-5 text-center">
        <div className="d-flex flex-column align-items-center">
          <h1 className="text-black mb-3">Experienced Team</h1>
          <p className="txt-grey w-50">
            To doesn't his appear replenish together called he of mad place
            won't wherein blessed second every wherein were meat kind wherein
            and martcin
          </p>
        </div>
      </div>
      <Teams team={teamsData} />
      {/* Appointment */}
      <Appointment />
    </>
  );
};

export default Home;
