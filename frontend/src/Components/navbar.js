import React from "react";
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router';
import axios from "axios";

const Navbar = () => {
  let navigate = useNavigate();

  const logout=()=>{
    axios.get("http://localhost:8000/register").then((res)=>
    {
      return;
    })
  }

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a class="navbar-brand" href="/">
              E-Library
            </a>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link to={"/"} className="nav-link active">
                  Home
                  </Link>
              </li>
              <li class="nav-item">
                {/* <a class="nav-link active" href="#">
                  Users
                </a> */}
                <Link to={"/Data"} className="nav-link active">
                  Users
                </Link>
              </li>
              <li class="nav-item">
                {/* <a class="nav-link active" href="#">
                  Books
                </a> */}
                <Link to={"/BooksMenu"} className="nav-link active">
                  Books
                </Link>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="/login" onClick={logout}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
