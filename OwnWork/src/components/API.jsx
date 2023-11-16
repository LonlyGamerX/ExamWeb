import axios from "axios";
axios.defaults.withCredentials = true;

const port = 5029;
const urlendpoint = "http://localhost:" + port;

// Non-Admin Stuff
const aboutEP = "/about";
const treatmentEP = "/treatment";
const recommendationNumEP = "/recommendation/antal/3"; // 3 is the number of recommendations to be shown
const teamEP = "/team";
const appointmentEP = "/appointment";
const footerEP = "/footer";
const newsletterEP = "/newssubscription";

// Admin Stuff
const loginEP = "/login/login";
const userEP = "/user/admin";
const adminFooterEP = "/footer/admin";
const adminAboutEP = "/about/admin";
const adminTreatmentEP = "/treatment/admin/";

const GetRequest = async (endpoint) => {
  try {
    const response = await axios.get(urlendpoint + endpoint);
    return response.data;
  } catch (error) {
    console.log("Error >>> ", error);
    return null;
  }
};

export const GetAbout = async () => {
  return await GetRequest(aboutEP);
};

export const GetTreatment = async () => {
  return await GetRequest(treatmentEP);
};

export const GetRecommendationNum = async () => {
  return await GetRequest(recommendationNumEP);
};

export const GetTeams = async () => {
  return await GetRequest(teamEP);
};

export const GetFooter = async () => {
  return await GetRequest(footerEP);
};

const PostRequestForm = async (endpoint, method = "get", data = null) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const response = await axios[method](urlendpoint + endpoint, data, config);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const PostAppointment = async (appointmentData) => {
  return await PostRequestForm(appointmentEP, "post", appointmentData);
};

export const PostNewsSubscription = async (NewsLetterData) => {
  return await PostRequestForm(newsletterEP, "post", NewsLetterData);
};

// Admin Stuff
const makeRequestAdmin = async (endpoint, method = "get", data = null) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const response = await axios[method](urlendpoint + endpoint, data, config);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const Login = async (email, password) => {
  try {
    const requestData = { email, password };
    const response = await makeRequestAdmin(
      loginEP,
      "post",
      JSON.stringify(requestData)
    );

    return { status: 200, data: response };
  } catch (error) {
    if (error.response) {
      return { status: error.response.status, data: error.response.data };
    } else {
      return { status: 500, data: null };
    }
  }
};

export const GetUsers = async () => {
  return await makeRequestAdmin(userEP);
};

export const UserCreation = async (email, password, name, admin) => {
  const requestData = { email, password, name, admin };
  return await makeRequestAdmin(userEP, "post", JSON.stringify(requestData));
};

export const UserDeletion = async (id) => {
  return await makeRequestAdmin(userEP + "/" + id, "delete");
};

export const UserUpdate = async (id, email, password, name, admin) => {
  const requestData = { email, password, name, admin };
  return await makeRequestAdmin(
    userEP + "/" + id,
    "put",
    JSON.stringify(requestData)
  );
};

export const Logout = async () => {
  return await makeRequestAdmin(urlendpoint + "/login/logout", "get");
};

export const EditFooter = async (footerData) => {
  return await makeRequestAdmin(
    adminFooterEP,
    "put",
    JSON.stringify(footerData)
  );
};

export const EditAbout = async (aboutData) => {
  return await makeRequestAdmin(adminAboutEP, "put", JSON.stringify(aboutData));
};

export const CreateTreatment = (treatmentData) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("title", treatmentData.title);
    formData.append("content", treatmentData.content);
    formData.append("image", treatmentData.image);

    // Make a POST request to the API endpoint with the FormData
    axios
      .post(urlendpoint + adminTreatmentEP, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const EditTreatment = (id, editedTreatmentData) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("title", editedTreatmentData.title);
    formData.append("content", editedTreatmentData.content);
    formData.append("image", editedTreatmentData.image);

    // Make a POST request to the API endpoint with the FormData
    axios
      .put(urlendpoint + adminTreatmentEP + id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const DeleteTreatment = async (id) => {
  return await makeRequestAdmin(adminTreatmentEP + id, "delete");
};
