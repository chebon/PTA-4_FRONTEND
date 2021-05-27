import http from "../http-common";

const getAll = () => {
  return http.get("/get-all-patients");
};


const create = data => {
  return http.post("/insert-user", data);
};

const createCDM = data => {
  return http.post("/insert-cdm", data.data);
};

const createLocation = data => {
  return http.post("insert-location", data);
};

const findByTitle = title => {

  return http.post(`/search`, { name: title });

};

const findLocation = title => {

  return http.post(`/locations`, { name: title });

};

const TutorialService = {
  getAll,
  create,
  createCDM,
  createLocation,
  findLocation,

  findByTitle
};

export default TutorialService;
