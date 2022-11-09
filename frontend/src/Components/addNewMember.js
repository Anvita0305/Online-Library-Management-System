import axios from "axios";
import { React, useState } from "react";
import { useNavigate } from "react-router";

const AddNew = () => {
  // const [name, setName] = useState("");
  // const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [MIS, setMIS] = useState("");
  const [issuedBook, setIssuedBook] = useState("");
  // const [issueDate, setIssueDate] = useState("");
  // const issueDate=new Date().toLocaleDateString();
  let currentDate = new Date();
  let cDay = currentDate.getDate();
  let cMonth = currentDate.getMonth() + 1;
  let cYear = currentDate.getFullYear();
  let issueDate = cYear + "/" + cMonth + "/" + cDay;
  // const [returnDate, setReturnDate] = useState("");
  let returnDate=cYear + "/" + cMonth + "/" + (cDay+7);

  let navigate = useNavigate();

  async function addNewMember() {
    axios
      .post("http://localhost:8000/members", {
        email: email,
        mis: MIS,
        issuedbook: issuedBook,
        issuedate: issueDate,
        returndate: returnDate,
      })
      .then((res) => {
        console.log(res.data);
        document.getElementById("success-alert").innerHTML =
          "User registered successfully!";
        document.getElementById("success-alert").style.display = "block";
        console.log("success");
      })
      .catch((err) => {
        console.log(err);
        document.getElementById("err-alert").innerHTML =
          "Some Error Occured!! Try Again";
        document.getElementById("err-alert").style.display = "block";
      });
  }
  return (
    <>
      <div
        class="alert alert-danger"
        role="alert"
        id="err-alert"
        style={{ display: "none" }}
      ></div>
      <div
        class="alert alert-success"
        role="alert"
        id="success-alert"
        style={{ display: "none" }}
      ></div>
      <br></br>
      <div style={{ textAlign: "center" }}>
        <button
          type="button"
          class="btn btn-warning"
          onClick={() => {
            navigate(-1);
          }}
        >
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
        <br></br>
        <br></br>
      </div>
      <div
        className="container"
        style={{
          border: "2px solid black",
          borderBlockStyle: "dashed",
          backgroundColor: "rgba(255,255,255)",
        }}
      >
        <br></br>
        <h3 style={{ textAlign: "center" }}>
          Fill the following details to add new member!
        </h3>
        <br></br>
        {/* <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">
            @
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="Full Name"
            aria-label="Full Name"
            aria-describedby="basic-addon1"
          />
        </div> */}

        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="College Mail ID"
            aria-label="College Mail ID"
            aria-describedby="basic-addon2"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <span class="input-group-text" id="basic-addon2">
            @coep.ac.in
          </span>
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">MIS Number</span>
          <input
            type="text"
            class="form-control"
            aria-label="Amount (to the nearest dollar)"
            onChange={(e) => {
              setMIS(e.target.value);
            }}
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Books issued</span>
          <input
            type="text"
            class="form-control"
            aria-label="Amount (to the nearest dollar)"
            onChange={(e) => {
              setIssuedBook(e.target.value);
            }}
          />
        </div>
        {/* <div class="input-group mb-3">
          <span class="input-group-text">Issue Date</span>
          <input
            type="date"
            class="form-control"
            aria-label="Amount (to the nearest dollar)"
            value={issueDate}
            // onChange={(e) => {
            //   setIssueDate(e.target.value);
            // }}
          />
        </div> */}
        {/* <div class="input-group mb-3">
          <span class="input-group-text">Return Date</span>
          <input
            type="date"
            class="form-control"
            aria-label="Amount (to the nearest dollar)"
            onChange={(e) => {
              setReturnDate(e.target.value);
            }}
            // value={returnDate}
          />
        </div> */}

        <button className="btn btn-danger" onClick={addNewMember}>
          Submit
        </button>
        <br></br>
        <br></br>
      </div>
    </>
  );
};

export default AddNew;
