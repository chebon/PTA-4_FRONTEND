import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTutorial } from "../actions/tutorials";
import DateTimePicker from 'react-datetime-picker';

const AddPatient = () => {
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false
  };

  const [value] = useState(new Date());
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleChange = date => {
    const valueOfInput = date;
    let netdate = Date.parse(valueOfInput);
    let d = new Date(netdate);
    let newDate =
      d.getFullYear() + "-" +
      ("00" + (d.getMonth() + 1)).slice(-2) + "-" +
      ("00" + d.getDate()).slice(-2) + " " +
      ("00" + d.getHours()).slice(-2) + ":" +
      ("00" + d.getMinutes()).slice(-2) + ":" +
      ("00" + d.getSeconds()).slice(-2)

    let lastdate = newDate.split(" ");

    setTutorial({ dob: lastdate[0] })
  };


  const handleInputChange = event => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const saveTutorial = () => {
    const { patient_name, dob, gender, phone_number } = tutorial;

    dispatch(createTutorial(patient_name, dob, gender, phone_number))
      .then(data => {
        setTutorial({
          name: data.patient_name,
          dob: data.dob,
          gender: data.gender,
          phone_number: data.phone_number
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
            <label htmlFor="dob">dob</label>
            <DateTimePicker
              onChange={handleChange}
              value={value}
              name="dob"
              id="dob"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="patient_name">Name</label>
            <input
              type="text"
              className="form-control"
              id="patient_name"
              required
              value={tutorial.patient_name}
              onChange={handleInputChange}
              name="patient_name"
            />
          </div>


          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <input
              type="text"
              className="form-control"
              id="gender"
              required
              value={tutorial.gender}
              onChange={handleInputChange}
              name="gender"
            />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="phone_number"
              required
              value={tutorial.phone_number}
              onChange={handleInputChange}
              name="phone_number"
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

export default AddPatient;
