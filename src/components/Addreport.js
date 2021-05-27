import React, { useEffect, useState } from "react";

import axios from 'axios';

const Addreport = () => {

  const [books, setBooks, status] = useState(null);

  const apiURL = "http://localhost:3000/summary";

  const fetchData = async () => {
    const response = await axios.post(apiURL)

    //let cleanData = Object.entries(response.data)
    let cleanData = response.data

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
                <th>Location</th>
                <th>knownHypertensitive</th>
                <th>newHypertensitive</th>
                <th>Known Diabetic</th>
                <th>New Diabetic</th>
                <th>DIABETIC AND HYPERTENSIVE</th>
              </tr>
            </thead>
            <tbody>
              
            
          {books &&
            books.map((book, index) => {


              return  (

                <tr>
                <td><a href={"/report/location/"+book.location}>{book.location} </a></td>
                <td>{book.info.knownHypertensitive}</td>
                <td>{book.info.newHypertensitive}</td>
                <td>{book.info.knownDiabetic}</td>
                <td>{book.info.newDiabetic}</td>
                <td>{book.info.newDiabetic}</td>
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

export default Addreport;
