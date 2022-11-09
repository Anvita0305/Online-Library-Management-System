import axios from "axios";
import { React, useState } from "react";
import { useNavigate } from "react-router";

const AddNewBook = () => {
  const [isbn, setisbn] = useState("");
  const [title, settitle] = useState("");
  const [author, setauthor] = useState("");
  const [year, setyear] = useState("");
  const [publisher, setpublisher] = useState("");
  const [status, setstatus] = useState("");
  // const [copies, setcopies] = useState("");
  const [genre, setgenre] = useState("");
  
  let navigate = useNavigate();

  async function add() {
    axios
      .post("http://localhost:8000/addbook", {
        isbn: isbn,
        title: title,
        author: author,
        year: year,
        publisher: publisher,
        genre: genre,
      })
      .then((res) => {
        console.log("res");
        console.log(res.data);
      })
      .catch((err) => {
        console.log("err");
        console.log(err);
      });
  }

  return (
    <>
      <br></br>
      <div style={{textAlign:"center"}}>
      <button type="button" class="btn btn-warning" onClick={()=>{navigate(-1)}}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>
          Go Back
        </button>
        <br></br><br></br>
      </div>
      <div
        className="container"
        style={{ border: "2px solid black", borderBlockStyle: "dashed" ,backgroundColor:"white"}}
      >
        <br></br>
        <h3 style={{ textAlign: "center" }}>
          Fill the below details to add a new Book
        </h3>
        <br></br>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">
            @
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="Book Name"
            aria-label="Book Name"
            aria-describedby="basic-addon1"
            onChange={(e) => {
              settitle(e.target.value);
            }}
          />
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">
            Author
          </span>
          <input
            type="text"
            class="form-control"
            aria-label="Author's Name"
            aria-describedby="basic-addon2"
            onChange={(e) => {
              setauthor(e.target.value);
            }}
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">
            Publisher
          </span>
          <input
            type="text"
            class="form-control"
            aria-label="Author's Name"
            aria-describedby="basic-addon2"
            onChange={(e) => {
              setpublisher(e.target.value);
            }}
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Year of Publication</span>
          <input
            type="text"
            class="form-control"
            aria-label="Amount (to the nearest dollar)"
            onChange={(e) => {
              setyear(e.target.value);
            }}
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Book ID</span>
          <input
            type="text"
            class="form-control"
            aria-label="Amount (to the nearest dollar)"
            onChange={(e) => {
              setisbn(e.target.value);
            }}
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Genre</span>
          <input
            type="text"
            class="form-control"
            aria-label="Amount (to the nearest dollar)"
            onChange={(e) => {
              setgenre(e.target.value);
            }}
          />
        </div>
        {/* <div class="input-group mb-3">
          <span class="input-group-text">Quantity</span>
          <input
            type="number"
            class="form-control"
            aria-label="Amount (to the nearest dollar)"
            onChange={(e) => {
              setcopies(e.target.value);
            }}
          />
        </div> */}

        <button className="btn btn-danger" onClick={add}>
          Submit
        </button>

        <br />
        <br></br>
      </div>
    </>
  );
};

export default AddNewBook;
