import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createLocation } from "../actions/tutorials";

const AddLocation = () => {
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const saveTutorial = () => {
    const { location_name} = tutorial;

    dispatch(createLocation(location_name))
      .then(data => {
        setTutorial({
          name: data.location_name,
        });
        setSubmitted(true);

        console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTutorial}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="location_name">Name</label>
            <input
              type="text"
              className="form-control"
              id="location_name"
              required
              value={tutorial.location_name}
              onChange={handleInputChange}
              name="location_name"
            />
          </div>


          <button onClick={saveTutorial} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddLocation;
