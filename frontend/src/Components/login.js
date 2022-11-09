import {useState, React} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import img from "../Images/bookRegister.jfif";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let navigate = useNavigate();

    const check = () => {
      axios.get("http://localhost:8000/register").then((res) => {
        console.log(res.data)
        for(let i=0;i<res.data.length;i++){
          if(res.data[i].email === email){
            alert("Login Successful");
            navigate("/");
            return;
          }
        }
    })};
  return (
    <>
      <h1
        style={{
          fontSize: "3.5rem",
          textAlign: "center",
          color: "#20B2AA",
          fontFamily: "Red Hat Display",
        }}
      >
        Login
      </h1>
      <br></br>
      <div
        className="container main-page"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      >
        <div>
          <div style={{ textAlign: "center" }} className="container login-ip">
            <div class="mb-3 row">
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                style={{ height: "45px" }}
                onChange={(e) => {setEmail(e.target.value)}}
              />
              <br></br>
              <br></br>
            </div>
            <div class="mb-3 row">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                style={{ height: "45px" }}
                onChange={(e) => {setPassword(e.target.value)}}
              />
              <br></br>
              <br></br>
            </div>
            <br></br>
            <button className="btn btn-primary" onClick={check}>Login</button>
            <br></br>
            <br></br>
            <h5 style={{ color: "#20B2AA", fontFamily: "Red Hat Display" }}>
              Don't have an Account? <a href="/Register">Register</a> Now!
            </h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
