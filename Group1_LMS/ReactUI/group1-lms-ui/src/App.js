// import logo from './logo.svg';
// import './App.css';
// import Login from './Login';

// function App() {
//   return (
   
//    <Login/>
//   );
// }

// export default App;

//import React from "react";
import { BrowserRouter, Link, Route,Routes } from "react-router-dom";
import "./App.css";
import Login from "./Login";
import ShowLeads from "./Sales/ShowLeads";
import BookPolicy from "./Sales/BookPolicy";
import CustProfile from "./Customers/CustProfile";
import ViewPolicies from "./Customers/ViewPolicies";
import NotFound from "./NotFound";
import { useState } from "react";
import SalesOptions from "./SalesOptions";
import MainComp from "./MainComp";

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./Login";
// import Welcome from "./welcome";

function App() {
let[role,setRole]=useState("");
let roleCallback=(role)=>{
setRole(role);

}
  return (
   
    <>
    <BrowserRouter>
    <div>
      <h2 className="heading">Lead Management System</h2>
    </div>
    <br/>
    <br/>
    <div>
    <ul class="nav justify-content-end">
  <li class="nav-item">
    <Link className="nav-link active" to={"/login"}>Login</Link>
  </li>
  <li class="nav-item">
    <Link className="nav-link" to={"/show-leads"}>Are you Interested a policy</Link>
  </li>
 
</ul>
    </div>
    <br/>
    <div>
    {role==="Sales" ?<SalesOptions/> :" "}
    </div>
  
    <br/>
    <div>
      <Routes>
        <Route path="/login" element={<Login roleCb={roleCallback}></Login>}></Route>
        <Route path="/show-leads" element={<ShowLeads></ShowLeads>}></Route>
        <Route path="/main" element={<MainComp/>}></Route>
        <Route path="/book-policy" element={<BookPolicy></BookPolicy>}></Route>
        <Route path="/cust-profile" element={<CustProfile></CustProfile>}></Route>
        <Route path="/view-policies" element={<ViewPolicies></ViewPolicies>}></Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
        
      </Routes>
    </div>
    </BrowserRouter>
    </>
  );
}

export default App;