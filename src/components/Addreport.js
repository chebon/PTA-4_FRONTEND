import React, {useEffect, useState } from "react";

import axios from 'axios';

const Addreport = () => {

    const [books, setBooks] = useState(null);

    const apiURL = "https://www.anapioficeandfire.com/api/books?pageSize=30";

    const fetchData = async () => {
        const response = await axios.get(apiURL)

        setBooks(response.data) 
    }
    useEffect(() => {
        fetchData()
      });
    
 
  return (
    <div className="submit-form">
     
        <div>
          
        <div className="books">
        {books &&
          books.map((book, index) => {
            const cleanedDate = new Date(book.released).toDateString();
            const authors = book.authors.join(', ');

            return (
              <div className="book" key={index}>
                <h3>Book {index + 1}</h3>
                <h2>{book.name}</h2>

                <div className="details">
                  <p>👨: {authors}</p>
                  <p>📖: {book.numberOfPages} pages</p>
                  <p>🏘️: {book.country}</p>
                  <p>⏰: {cleanedDate}</p>
                </div>
              </div>
            );
          })}
      </div>

          
        </div>
      
    </div>
  );
};

export default Addreport;
