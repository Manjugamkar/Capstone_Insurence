// App.js

import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Pages/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Plans from "./Pages/Plans/Plans";
import PlanDetailPage from "./Pages/Plans/PlanDetailPage";
import Renew from "./Pages/Renew/Renew";
import Claims from "./Pages/Claims/Claims";
import About from "./Pages/About/About";
import Footer from "./Pages/Footer/Footer";
import Error from "./Pages/Error/Error";
import { AuthProvider } from "./Pages/Plans/Auth/auth";
import Logout from "./Pages/Plans/Auth/Logout";
import RegisterForm from "./Pages/Plans/Auth/RegisterForm";
import Login from "./Pages/Plans/Auth/Login";
import LeadDetails from "./Pages/Plans/LeadDetails";
import LeadGet from "./Pages/Plans/LeadGet";
import OnlineBenefit from "./Pages/Plans/OnlineBenefit";
import GetStarted from "./Pages/Plans/plansdata/GetStarted";
import AllLeads from "./Pages/Plans/AllLeads";
import AdminLogin from "./Pages/Plans/Auth/AdminLogin";

import Stat from "./Pages/Home/Stat";

const App = () => { 
  return (
    <div className="min-h-screen flex flex-col bg-[#FBFCF8]">
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/Details" element={<GetStarted/>}/>
          <Route path="/plans/:_id" element={<PlanDetailPage />} />
          <Route path="/renew" element={<Renew />} />
          <Route path="/claims" element={<Claims />} />
          <Route path="/about" element={<About />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />
          <Route path="/leaddetails" element={<LeadDetails/>}></Route>
          
          <Route path="/plandetails" element={<OnlineBenefit/>}></Route>
          <Route path="/benifits" element={<PlanDetailPage/>}></Route>
          <Route path="/leadGet" element={<LeadGet/>}></Route>
          <Route path="/allleads" element={<AllLeads/>}></Route>
          <Route path="/Admin" element={<AdminLogin/>}></Route>
         </Routes>
        <Footer />
      </AuthProvider>
    </div>
  );
};

export default App;
