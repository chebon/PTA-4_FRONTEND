import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveTutorials,
  findTutorialsByTitle,
  deleteAllTutorials,
} from "../actions/tutorials";
import { Link } from "react-router-dom";

const PatientsList = () => {
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  const tutorials = useSelector(state => state.tutorials);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveTutorials());
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const refreshData = () => {
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  const setActiveTutorial = (tutorial, index) => {
    setCurrentTutorial(tutorial);
    setCurrentIndex(index);
  };

  const removeAllTutorials = () => {
    dispatch(deleteAllTutorials())
      .then(response => {
        console.log(response);
        refreshData();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    refreshData();
    dispatch(findTutorialsByTitle(searchTitle));
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Patients List</h4>

        <ul className="list-group">
          {tutorials &&
            tutorials.map((tutorial, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTutorial(tutorial, index)}
                key={index}
              >
                {tutorial.name}
              </li>
            ))}
        </ul>

       
      </div>
      <div className="col-md-6">
        {currentTutorial ? (
          <div>
            <h4>Tutorial</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentTutorial.name}
            </div>
            <div>
              <label>
                <strong>Gender:</strong>
              </label>{" "}
              {currentTutorial.gender}
            </div>
            <div>
              <label>
                <strong>D.O.B:</strong>
              </label>{" "}
              {currentTutorial.dob}
            </div>
            <div>
              <label>
                <strong>Created On</strong>
              </label>{" "}
              {currentTutorial.date_created}
            </div>
           

            <Link
              to={"/diagnosis/create/" + currentTutorial.patient_id}
              className="badge badge-warning"
            >
              Create Diagnosis
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Patient to create diagnosis...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientsList;
