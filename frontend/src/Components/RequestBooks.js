import axios from "axios";
import {useState,React} from "react";
import Navbar from "./navbar";

const RequestBooks = () => {
    const [name, setName] = useState("");
    const[author,setauthorname]=useState("");

    const func=()=>{
    
    }
 
  return (
    <>
      <Navbar />
      <br></br>
      <div className="container" style={{ backgroundColor: "white",border:"2px solid black" }}>
        <br></br>
        <br></br>
        <h2 style={{ textAlign: "center",color:"black"}}>
          Enter the details of the Books you wish to read:
        </h2>
        <div className="container" style={{border:"2px solid white"}}>
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
                setName(e.target.value);
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
                setauthorname(e.target.value);
            }}
          />
        </div>
        <button className="btn btn-info" style={{marginLeft:"45%"}} onClick={func}>Submit</button>
        <br></br>
        <br></br>
        </div>

      </div>
    </>
  );
};

export default RequestBooks;
