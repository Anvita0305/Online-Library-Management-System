import React from "react";
import Navbar from "./navbar";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";
import Books from "./books";

const Mainpage = () => {
  let navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="maincards">
        <div className="card" style={{ width: "25rem" }}>
          <img
            className="card-img-top"
            src="https://www.bing.com/th?id=OIP.0wTROro3xy85c0rkuAtbzQAAAA&w=187&h=147&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
            alt="Card image cap"
          />
          <div className="card-body">
            <h5 className="card-title">Millions of users</h5>
            <p className="card-text">
              lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <a href="/addNew" className="btn btn-primary">
              Add User
            </a>
          </div>
        </div>
        <div className="card" style={{ width: "25rem" }}>
          <img
            className="card-img-top"
            src="https://www.bing.com/th?id=OIP.RoKaElX0fzDTMWFcz4w16AHaEh&w=319&h=195&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
            alt="Card image cap"
          />
          <div className="card-body">
            <h5 className="card-title">1000+ Books</h5>
            <p className="card-text">
              lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <a href="/AddNewBook" className="btn btn-primary">
              Add Book
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mainpage;
