import React, { useEffect, useState } from "react";

import axios from 'axios';

const Locationreport = () => {

  const [books, setBooks] = useState(null);

  const apiURL = "http://localhost:3000/report/monthly";

  const fetchData = async () => {

    let locationInfo = window.location.pathname
    locationInfo = locationInfo.split('/');
    locationInfo = locationInfo[3]
    const response = await axios({
      method: 'post',
      url: apiURL,
      data: {
        location_id: locationInfo,
      }
    });

    //let cleanData = Object.entries(response.data)
    let cleanData = response.data['rows']

    setBooks(cleanData)
  }
  useEffect(() => {

    fetchData()
  }, []);


  return (
    <div>

      <div>

        <div className="books">

          <table class="table">
            <thead>
              <tr>
                <th>PatientName</th>
                <th>EncounterDate</th>
                <th>Location</th>
                <th>HypertensionStatus</th>
                <th>DiabetesStatus</th>
                <th>Gender</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>


              {books &&
                books.map((book, index) => {

                  let htsts = ""
                  let dbtc = ""
                  var today = new Date();
                  var birthDate = new Date(book.user[0].dob);
                  var age = today.getFullYear() - birthDate.getFullYear();
                  var m = today.getMonth() - birthDate.getMonth();
                  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                  }

                  
                  if(book.htn_status === 7285){
                     htsts = "New"
                  } else {
                     htsts = "Known" 
                  }

                  if(book.dm_status === 7285){
                     dbtc = "New" 
                  } else {
                     dbtc = "Known" 
                  }


                  return (
                    <tr>
                      <td>{book.user[0].name}</td>
                      <td>{book.encounter_datetime}</td>
                      <td>{book.location_id}</td>
                      <td>{htsts}</td>
                      <td>{dbtc}</td>
                      <td>{book.user[0].gender}</td>
                      <td>{age}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>


      </div>

    </div>
  );
};

export default Locationreport;
