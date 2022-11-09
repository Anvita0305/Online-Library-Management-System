import { textAlign } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import AddNewBook from "./AddNewBook";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar";

const LostBooks = () => {
  const [data, setData] = useState([]);
  const fetchData = (e) => {
    axios
      .get("http://localhost:8000/lostbook")
      .then((res) => {
        console.log(res.data);
        // for (let i = 0; i < res.data.length; i++) {
        //   if (res.data[i].issuedBook === null) {
        //     document.getElementById("ret-btn").innerHTML = "Return Book";
        //   }
        // }
          setData(res.data);
      })
      .catch((err) => {
        console.log("err");
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <br></br>
      <div className="container">
        <div className="booksmenu" style={{ backgroundColor: "white" }}>
          <ul>
            <li style={{ margin: "1.5rem" }}>
            <Link to="/BooksMenu">All</Link>
            </li>
            {/* <li style={{ margin: "1.5rem" }}>New Books</li>
            <li style={{ margin: "1.5rem" }}>Books to be Ordered</li> */}
            <li style={{ margin: "1.5rem" }}>
              <Link to={"/AddNewBook"}>Add Books</Link>
            </li>
            <li style={{ margin: "1.5rem" }}>
              <Link to={"/DamagedBooks"}>Damaged Books</Link>
            </li>
            <li style={{ margin: "1.5rem" }}>
              <Link to={"/LostBooks"}>Lost Books</Link>
            </li>
            <li style={{ margin: "1.5rem" }}>
              <Link to={"/ReplaceBooks"}>Books to be Replaced</Link>
            </li>
          </ul>
        </div>
        <br />
        {/* <div style={{ textAlign: "center" }}>
          <button className="btn btn-info">Add New Book</button>
          </div>
          <br/> */}
        <table class="table table-striped" style={{ backgroundColor: "white" }}>
          <thead>
            <tr>
              <th scope="col">
                <b>ISBN</b>
              </th>
              <th scope="col">
                <b>Title</b>
              </th>
              <th scope="col">
                <b>Author</b>
              </th>
              <th scope="col">
                <b>Year of Publication</b>
              </th>
              <th scope="col">
                <b>Publisher</b>
              </th>
              <th scope="col">
                <b>Genre</b>
              </th>
              <th scope="col">
                <b>Status</b>
              </th>
              {/* <th scope="col">
                <b>Number of Copies available</b>
              </th> */}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr>
                <td>{item.isbn}</td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>{item.year_of_publication}</td>
                <td>{item.publisher}</td>
                <td>{item.genre}</td>
                <td>{item.status}</td>
                <td>{item.no_of_copies}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LostBooks;
