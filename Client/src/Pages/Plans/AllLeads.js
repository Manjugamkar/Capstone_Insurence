import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

const LeadSearch = () => {
  const [leads, setLeads] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch all leads on component mount
  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5286/api/Lead');
        setLeads(response.data);
      } catch (err) {
        setError('Failed to load leads.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  // Generate PDF for a single lead
  const generatePDF = (lead) => {
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

    doc.save(`LeadDetails_${lead.id}.pdf`);
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
      <h2 className="text-xl font-bold mb-4">All Leads</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {leads.length === 0 && !loading && <p>No leads found.</p>}

      {leads.map((lead) => (
     
        <div
        key={lead.id}
        className="bg-white shadow-lg rounded-xl p-6 mb-6 border border-gray-200 transition duration-300 hover:shadow-xl"
      >
        <h3 className="text-xl font-bold text-blue-600 mb-4">Lead ID: {lead.id}</h3>
      
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
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
        </div>
      
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => generatePDF(lead)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow"
          >
            Download PDF
          </button>
          <button
    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded shadow"
    onClick={() => alert('Lead approved successfully!')}
  >
    Approve
  </button>

  <button
    className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded shadow"
    onClick={() => alert('Lead rejected.')}
  >
    Reject
  </button>
        </div>
      </div>
      
      ))}
    </div>
  );
};

export default LeadSearch;
