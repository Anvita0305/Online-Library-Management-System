import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./Components/registration";
import Login from "./Components/login";
import Mainpage from "./Components/mainpage";
import Data from "./Components/Data";
import AddNew from "./Components/addNewMember";
import Books from "./Components/books";
import AddNewBook from "./Components/AddNewBook";
import ReplaceBooks from "./Components/ReplaceBooks";
import LostBooks from "./Components/LostBooks";
import DamagedBooks from "./Components/DamagedBooks";
import RequestBooks from "./Components/RequestBooks";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route exact path="/" element={<Mainpage />} />
          <Route exact path="/Register" element={<Registration />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/Data" element={<Data />} />
          <Route exact path="/addNew" element={<AddNew />} />
          <Route exact path="/BooksMenu" element={<Books/>}/>
          <Route exact path="/AddNewBook" element={<AddNewBook/>}/>
          <Route exact path="/ReplaceBooks" element={<ReplaceBooks/>}/>
          <Route exact path="/LostBooks" element={<LostBooks/>}/>
          <Route exact path="/DamagedBooks" element={<DamagedBooks/>}/>
          <Route exact path="/RequestBooks" element={<RequestBooks/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
