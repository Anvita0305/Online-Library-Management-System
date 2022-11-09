import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./navbar";
import { useNavigate } from "react-router";

function Data() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const addNewMember = () => {
    navigate("/addNew");
  };
  const fetchData = (e) => {
    axios
      .get("http://localhost:8000/members")
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
      <h1 style={{ textAlign: "center", color: "white" }}>Members</h1>
      <br></br>
      <div style={{ textAlign: "center" }}>
        <button type="button" class="btn btn-info" onClick={addNewMember}>
          Add Data
        </button>
      </div>
      <br></br>
      <div className="container">
        <table class="table table-striped" style={{ backgroundColor: "white" }}>
          <thead>
            <tr>
              <th scope="col">
                <b>Name</b>
              </th>
              <th scope="col">
                <b>Contact</b>
              </th>
              <th scope="col">
                <b>Email ID</b>
              </th>
              <th scope="col">
                <b>MIS</b>
              </th>
              <th scope="col">
                <b>Books Issued</b>
              </th>
              <th scope="col">
                <b>Issue Date</b>
              </th>
              <th scope="col">
                <b>Return Date</b>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.contact}</td>
                <td>{item.email}</td>
                <td>{item.mis}</td>
                <td>{item.issuedBooks}</td>
                <td>{item.issueDate}</td>
                <td>{item.returnDate}</td>
                <button
                  className="btn btn-danger"
                  style={{ color: "black" }}
                  onClick={() => {
                    axios
                      .delete(
                        "http://localhost:8000/members/" + item.issuedBooks
                      )
                      .then((res) => {
                        console.log(res.data);
                      });
                    axios
                      .delete("http://localhost:8000/members/" + item.mis)
                      .then((res) => {
                        console.log(res.data);
                      });
                  }}
                >
                  <h6 id="ret-btn">Return Book</h6>
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Data;
