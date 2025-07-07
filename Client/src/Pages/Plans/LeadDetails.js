


import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

export default function LeadDetails() {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
   
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    motherName: '',
    hasMedicalConditions: '',
    householdSize: 1,
    estimatedHouseholdIncome: '',
    lifeEvents: '',
    address: '',
    zipCode: '',
    phoneNumber: '',
    insuranceType: '',
    termOfInsurance: '',
    sumAssured: ''
  });
  const rejectedConditions = ['cancer','diabetes', 'hiv/aids', 'heartDisease', 'stroke'];
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rejectedConditions.includes(formData.hasMedicalConditions?.toLowerCase())) {
      alert('Policy rejected due to disqualifying medical condition.');
      return; // Stop submission
    }
    try {
      // Adjust the URL to your API endpoint
      const response = await axios.post('http://localhost:5286/api/Lead/Create', {
        ...formData,
        dob: new Date(formData.dob).toISOString(), // Format for DateTime
      });

      console.log('Data submitted successfully:', response.data);    
      alert('Policy Booked');
      Navigate("/");
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Submission failed.');
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-center ">
        <h1 className="text-3xl font-bold mb-4">Enter Details</h1>
         <div className="w-64">
  
      <form onSubmit={handleSubmit}>
      <input name="firstName" placeholder="First Name" onChange={handleChange}  className="w-full px-4 py-2 mb-2 rounded border" />
      <input name="lastName" placeholder="Last Name" required onChange={handleChange}   className="w-full px-4 py-2 mb-2 rounded border"/>
      <input name="dob" type="date" required onChange={handleChange}  className="w-full px-4 py-2 mb-2 rounded border" />
      <input name="gender" placeholder="Gender (M or F)" required onChange={handleChange}  className="w-full px-4 py-2 mb-2 rounded border" />
      <input name="motherName" placeholder="Mother's Name" onChange={handleChange}  className="w-full px-4 py-2 mb-2 rounded border" />
      {/* <input name="hasMedicalConditions" placeholder="Has Medical Conditions" required onChange={handleChange}   className="w-full px-4 py-2 mb-2 rounded border"/> */}
      <select
        name="hasMedicalConditions"
        placeholder="Has Medical Conditions"
        value={formData.hasMedicalConditions}
        onChange={handleChange}

        className="w-full px-4 py-2 mb-2 rounded border"
        required
      >
       
        <option value="">Any Medical Conditions?</option>
        <option value="cancer">Cancer</option>
        <option value="diabetes">Diabetes</option>
        <option value="hiv/aids" >HIV/AIDS</option>
        <option value="heartDisease">Heart Disease</option>
        <option value="stroke">Stroke</option>
        <option value="no">N/A</option>
      </select>
      <input name="householdSize" placeholder="House Hold size " type="number" min="1" max="6" required onChange={handleChange}  className="w-full px-4 py-2 mb-2 rounded border" />
      <input name="estimatedHouseholdIncome" placeholder="House Hold Income" type="number" step="0.01" required onChange={handleChange}  className="w-full px-4 py-2 mb-2 rounded border" />
      <input name="lifeEvents" placeholder="Life Events (JSON or comma-separated)" onChange={handleChange}   className="w-full px-4 py-2 mb-2 rounded border"/>
      <input name="address" placeholder="Address" required onChange={handleChange}  className="w-full px-4 py-2 mb-2 rounded border" />
      <input name="zipCode" placeholder="Zip Code" maxLength="10" required onChange={handleChange}  className="w-full px-4 py-2 mb-2 rounded border" />
      <input name="phoneNumber" placeholder="Phone Number" required onChange={handleChange}   className="w-full px-4 py-2 mb-2 rounded border"/>
      <input name="insuranceType" placeholder="Insurance Type (Health or Medicare)" required onChange={handleChange}  className="w-full px-4 py-2 mb-2 rounded border" />
      <input name="termOfInsurance" placeholder="Term of insurence" type="number" min="10" max="30" step="5" required onChange={handleChange}  className="w-full px-4 py-2 mb-2 rounded border" />
      <input name="sumAssured"  placeholder="Sume Assured"type="number" step="0.01" required onChange={handleChange}  className="w-full px-4 py-2 mb-2 rounded border" />

      <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Submit</button>
    </form>
    </div>
    </div>
  );
}

