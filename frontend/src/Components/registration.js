import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [contact, setcontact] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const navigate = useNavigate();

  async function register() {
    axios
      .post("http://localhost:8000/register", {
        name: name,
        email: email,
        contact: contact,
        password: password,
        cpassword: cpassword,
      })
      .then((res) => {
        console.log(res.data);
        // const data = res.json();
        //////////////////////////////////// VALIDATIONS////////////////////////////////////
        if (res.data === "ok") {
          // alert("User registered successfully!");
          // document.write("<div class='alert alert-danger' role='alert'> </div>");
          document.getElementById("success-alert").innerHTML =
            "User registered successfully!";
          document.getElementById("success-alert").style.display = "block";
          navigate("/Login");
        } else if (res.data === "dupemail") {
          // alert("Email already exists!");
          document.getElementById("err-alert").innerHTML =
            "Email already exists!";
          document.getElementById("err-alert").style.display = "block";
          navigate("/Register");
        } else if (res.data === "invemail") {
          // alert("Invalid Email Format!");
          document.getElementById("err-alert").innerHTML =
            "Invalid Email Format!";
          document.getElementById("err-alert").style.display = "block";
          navigate("/Register");
        } else if (res.data === "passmatch") {
          // alert("Passwords not matching!");
          document.getElementById("err-alert").innerHTML =
            "Passwords not matching!";
          document.getElementById("err-alert").style.display = "block";
          navigate("/Register");
        } else if (res.data === "tooshort") {
          // alert("Password too Short! Must be between 8-20 characters");
          navigate("/Register");
          // document.write("<div class='alert alert-danger' role='alert'>  </div>");
          // {<div class="alert alert-danger" role="alert">
          //   Password too Short! Must be between 8-20 characters
          // </div>}
          document.getElementById("err-alert").innerHTML =
            "<div>An example danger alert with an icon</div>";
        } else if (res.data === "toolong") {
          // alert("Password too Long! Must be between 8-20 characters");
          document.getElementById("err-alert").innerHTML =
            "Password too Long! Must be between 8-20 characters";
          document.getElementById("err-alert").style.display = "block";
          navigate("/Register");
        } else if (res.data === "invpass") {
          // alert("Password should contain only alphanumeric characters!");
          document.getElementById("err-alert").innerHTML =
            "Password should contain only alphanumeric characters!";
          document.getElementById("err-alert").style.display = "block";
          navigate("/Register");
        }
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
      <h1 style={{ fontSize:"3.5rem",textAlign: "center",color:"#20B2AA",fontFamily: "Red Hat Display" }}>Registration</h1>
      {/* <br></br> */}
      <div className="container main-page" style={{backgroundColor:"rgba(0, 0, 0, 0.8)"}}>
        <div
          style={{ textAlign: "center" }}
          className="mb-6 registration-ip"
        >
          <div class="mb-3 row">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              style={{ height: "45px" }}
            />
          </div>

          <br></br>

          <div class="mb-3 row">
            <input
              type="text"
              placeholder="Email"
              className="form-control"
              onChange={(e) => {
                setemail(e.target.value);
              }}
              style={{ height: "45px" }}
            />
          </div>
          <br></br>
          <div class="mb-3 row">
            <input
              type="text"
              placeholder="Contact Number"
              className="form-control"
              onChange={(e) => {
                setcontact(e.target.value);
              }}
              style={{ height: "45px" }}
            />
          </div>

          <br></br>
          {/* <div class="mb-3 row">
            <input
              type="text"
              placeholder="Age"
              className="form-control"
              onChange={(e) => {
                setage(e.target.value);
              }}
              style={{ height: "45px" }}
            />
          </div>
          <br></br> */}

          <div class="mb-3 row">
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              style={{ height: "45px" }}
            />
          </div>
          <br></br>

          <div class="mb-3 row">
            <input
              type="password"
              placeholder="Confirm Password"
              className="form-control"
              onChange={(e) => {
                setcpassword(e.target.value);
              }}
              style={{ height: "45px" }}
            />
          </div>
          <br></br>
          <button className="btn btn-primary" onClick={register}>Register</button>
          <br></br><br></br>
          <h5 style={{color:"#20B2AA",fontFamily: "Red Hat Display"}}>Already have an Account? <a href="/Login">Login</a> Now!</h5>
        </div>
      </div>
    </>
  );
};

export default Registration;
