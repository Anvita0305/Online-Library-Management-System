import React from "react";
import axios from "axios";
import { Button} from "@mui/material";

const CardD = (props) => {
  function addToCart() {
      axios.post("http://localhost:8000/members", {
        name: props.name,
        contact: props.contact,
        issuedBook: props.issuedBook,
        issueDate: props.issueDate,
        returnDate: props.returnDate,
      }).then((res) => { console.log(res); });
  }
  return (
    <>
    <table class="table table-striped">
      <thead>
        <tr>
          {/* <th scope="col">#</th> */}
          <th scope="col"><b>Name</b></th>
          <th scope="col"><b>Email</b></th>
          <th scope="col"><b>MIS</b></th>
          <th scope="col"><b>Book Issued</b></th>
          <th scope="col"><b>Issue Date</b></th>
          <th scope="col"><b>Return Date</b></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {/* <th scope="row">1</th> */}
          <td>{props.name}</td>
          <td>{props.contact}</td>
          <td>{props.issuedBook}</td>
          <td>{props.issueDate}</td>
          <td>{props.returnDate}</td>
          <td><input type="number" min="1" max="10" /></td>
          <td><Button variant="outlined" onClick={addToCart}>Add to Cart</Button></td>
        </tr>
      </tbody>
    </table>
    </>
  );
};

export default CardD;
