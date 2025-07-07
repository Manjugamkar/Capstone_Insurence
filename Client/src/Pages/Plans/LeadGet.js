
// import React, { useState } from 'react';
// import axios from 'axios';
// import jsPDF from 'jspdf';

// const LeadSearch = () => {
//   const [name, setName] = useState('');
//   const [lead, setLead] = useState(null);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSearch = async () => {
//     if (!name.trim()) {
//       setError('Please enter a valid name.');
//       setLead(null);
//       return;
//     }

//     setLoading(true);
//     setError('');
//     setLead(null);

//     try {
//       const response = await axios.get(`http://localhost:5286/api/Lead/byname/${encodeURIComponent(name.trim())}`);
//       setLead(response.data);
//     } catch (err) {
//       setError('Lead not found or server error.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   // Generate PDF
//   const generatePDF = () => {
//     if (!lead) return;

//     const doc = new jsPDF();
//     doc.setFontSize(18);
//     doc.text('Lead Details', 14, 22);
//     doc.setFontSize(12);

//     doc.text(`ID: ${lead.id}`, 14, 32);
//     doc.text(`Name: ${lead.firstName} ${lead.lastName}`, 14, 40);
//     doc.text(`DOB: ${new Date(lead.dob).toLocaleDateString()}`, 14, 48);
//     doc.text(`Gender: ${lead.gender}`, 14, 56);
//     doc.text(`Mother's Name: ${lead.motherName || 'N/A'}`, 14, 64);
//     doc.text(`Medical Conditions: ${lead.hasMedicalConditions}`, 14, 72);
//     doc.text(`Household Size: ${lead.householdSize}`, 14, 80);
//     doc.text(`Household Income: ₹${lead.estimatedHouseholdIncome}`, 14, 88);
//     doc.text(`Life Events: ${lead.lifeEvents}`, 14, 96);
//     doc.text(`Address: ${lead.address}`, 14, 104);
//     doc.text(`Zip Code: ${lead.zipCode}`, 14, 112);
//     doc.text(`Phone: ${lead.phoneNumber}`, 14, 120);
//     doc.text(`Insurance Type: ${lead.insuranceType}`, 14, 128);
//     doc.text(`Term: ${lead.termOfInsurance} years`, 14, 136);
//     doc.text(`Sum Assured: ₹${lead.sumAssured}`, 14, 144);

//     doc.save(`LeadDetails_${lead.id}.pdf`);
//   };

//   return (
//     <div style={{ maxWidth: '600px', margin: 'auto' }}>
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         onKeyPress={handleKeyPress}
//         placeholder="Enter Full Name"
//         style={{ padding: '8px', width: '80%' }}
//       />
//       <button
//         onClick={handleSearch}
//         style={{ padding: '8px 12px', marginLeft: '8px' }}
//         className="bg-blue-500 text-white rounded-md px-4 py-2 mr-2"
//       >
//         View Details
//       </button>

//       {loading && <p>Loading...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {lead && (
      
//         <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl border border-gray-200">
//   <h2 className="text-2xl font-bold text-blue-600 mb-6">
//     Lead Details <span className="text-gray-500">(ID: {lead.id})</span>
//   </h2>

//   <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm text-gray-700">
//     <p><strong>Name:</strong> {lead.firstName} {lead.lastName}</p>
//     <p><strong>DOB:</strong> {new Date(lead.dob).toLocaleDateString()}</p>
//     <p><strong>Gender:</strong> {lead.gender}</p>
//     <p><strong>Mother's Name:</strong> {lead.motherName || 'N/A'}</p>
//     <p><strong>Medical Conditions:</strong> {lead.hasMedicalConditions}</p>
//     <p><strong>Household Size:</strong> {lead.householdSize}</p>
//     <p><strong>Income:</strong> ₹{lead.estimatedHouseholdIncome}</p>
//     <p><strong>Life Events:</strong> {lead.lifeEvents}</p>
//     <p><strong>Address:</strong> {lead.address}</p>
//     <p><strong>Zip Code:</strong> {lead.zipCode}</p>
//     <p><strong>Phone:</strong> {lead.phoneNumber}</p>
//     <p><strong>Insurance Type:</strong> {lead.insuranceType}</p>
//     <p><strong>Term:</strong> {lead.termOfInsurance} years</p>
//     <p><strong>Sum Assured:</strong> ₹{lead.sumAssured}</p>
//   </div>

//   <div className="mt-6">
//     <button
//       onClick={generatePDF}
//       className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded shadow transition duration-200"
//     >
//       Download PDF
//     </button>
//   </div>
// </div>

//       )}
//     </div>
//   );
// };

// export default LeadSearch;
import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

const LeadSearch = () => {
  const [name, setName] = useState('');
  const [lead, setLead] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Interest rate example
  const interestRate = 0.05; // 5% annual

  const handleSearch = async () => {
    if (!name.trim()) {
      setError('Please enter a valid name.');
      setLead(null);
      return;
    }

    setLoading(true);
    setError('');
    setLead(null);

    try {
      const response = await axios.get(`http://localhost:5286/api/Lead/byname/${encodeURIComponent(name.trim())}`);
      setLead(response.data);
    } catch (err) {
      setError('Lead not found or server error.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Calculate maturity amount based on sumAssured and termOfInsurance
  const calculateMaturityAmount = (sumAssured, term) => {
    return sumAssured + (sumAssured * interestRate * term);
  };

  // Generate PDF
  const generatePDF = () => {
    if (!lead) return;

    const maturityAmount = calculateMaturityAmount(lead.sumAssured, lead.termOfInsurance);

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Lead Details', 14, 22);
    doc.setFontSize(12);

    doc.text(`ID: ${lead.id}`, 14, 32);
    doc.text(`Name: ${lead.firstName} ${lead.lastName}`, 14, 40);
    doc.text(`DOB: ${new Date(lead.dob).toLocaleDateString()}`, 14, 48);
    doc.text(`Gender: ${lead.gender}`, 14, 56);
    doc.text(`Mother's Name: ${lead.motherName || 'N/A'}`, 14, 64);
    doc.text(`Medical Conditions: ${lead.hasMedicalConditions}`, 14, 72);
    doc.text(`Household Size: ${lead.householdSize}`, 14, 80);
    doc.text(`Household Income: ₹${lead.estimatedHouseholdIncome}`, 14, 88);
    doc.text(`Life Events: ${lead.lifeEvents}`, 14, 96);
    doc.text(`Address: ${lead.address}`, 14, 104);
    doc.text(`Zip Code: ${lead.zipCode}`, 14, 112);
    doc.text(`Phone: ${lead.phoneNumber}`, 14, 120);
    doc.text(`Insurance Type: ${lead.insuranceType}`, 14, 128);
    doc.text(`Term: ${lead.termOfInsurance} years`, 14, 136);
    doc.text(`Sum Assured: ₹${lead.sumAssured}`, 14, 144);
    doc.text(`Maturity Amount: ₹${maturityAmount.toFixed(2)}`, 14, 152);

    doc.save(`LeadDetails_${lead.id}.pdf`);
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Enter Full Name"
        style={{ padding: '8px', width: '80%' }}
      />
      <button
        onClick={handleSearch}
        style={{ padding: '8px 12px', marginLeft: '8px' }}
        className="bg-blue-500 text-white rounded-md px-4 py-2 mr-2"
      >
        View Details
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {lead && (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl border border-gray-200">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">
            Lead Details <span className="text-gray-500">(ID: {lead.id})</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm text-gray-700">
            <p><strong>Name:</strong> {lead.firstName} {lead.lastName}</p>
            <p><strong>DOB:</strong> {new Date(lead.dob).toLocaleDateString()}</p>
            <p><strong>Gender:</strong> {lead.gender}</p>
            <p><strong>Mother's Name:</strong> {lead.motherName || 'N/A'}</p>
            <p><strong>Medical Conditions:</strong> {lead.hasMedicalConditions}</p>
            <p><strong>Household Size:</strong> {lead.householdSize}</p>
            <p><strong>Income:</strong> ₹{lead.estimatedHouseholdIncome}</p>
            <p><strong>Life Events:</strong> {lead.lifeEvents}</p>
            <p><strong>Address:</strong> {lead.address}</p>
            <p><strong>Zip Code:</strong> {lead.zipCode}</p>
            <p><strong>Phone:</strong> {lead.phoneNumber}</p>
            <p><strong>Insurance Type:</strong> {lead.insuranceType}</p>
            <p><strong>Term:</strong> {lead.termOfInsurance} years</p>
            <p><strong>Sum Assured:</strong> ₹{lead.sumAssured}</p>
            <p><strong>Maturity Amount:</strong> ₹{calculateMaturityAmount(lead.sumAssured, lead.termOfInsurance).toFixed(2)}</p>
          </div>

          <div className="mt-6">
            <button
              onClick={generatePDF}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded shadow transition duration-200"
            >
              Download PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadSearch;
