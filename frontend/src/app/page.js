

"use client";

import React, { useState } from 'react';

export default function CreateToken() {
  const [formData, setFormData] = useState({
    projectName: '',
    tokenName: '',
    tokenSymbol: '',
    preMintedTokens: '',
    transferFee: '',
    featureFlags: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData); // For debugging, remove or comment out in production

    try {
      const response = await fetch('http://localhost:8000/setupICRC1Ledger', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result); // For debugging, remove or comment out in production
      alert('Token created successfully!');
    } catch (error) {
      console.error('Failed to create token:', error);
      alert('Failed to create token. Please try again.');
    }
  };


return (
  <div className="container mx-auto p-4 max-w-4xl">
    <h1 className="text-2xl font-bold mb-6 text-center">Create a New Token</h1>
    <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label htmlFor="projectName" className="block text-gray-700 text-sm font-bold mb-2">Project Name</label>
        <input type="text" id="projectName" name="projectName" value={formData.projectName} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label htmlFor="tokenName" className="block text-gray-700 text-sm font-bold mb-2">Token Name</label>
        <input type="text" id="tokenName" name="tokenName" value={formData.tokenName} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label htmlFor="tokenSymbol" className="block text-gray-700 text-sm font-bold mb-2">Token Symbol</label>
        <input type="text" id="tokenSymbol" name="tokenSymbol" value={formData.tokenSymbol} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label htmlFor="preMintedTokens" className="block text-gray-700 text-sm font-bold mb-2">Pre-Minted Tokens</label>
        <input type="number" id="preMintedTokens" name="preMintedTokens" value={formData.preMintedTokens} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label htmlFor="transferFee" className="block text-gray-700 text-sm font-bold mb-2">Transfer Fee</label>
        <input type="number" id="transferFee" name="transferFee" value={formData.transferFee} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Feature Flags</label>
        <label className="inline-flex items-center">
          <input type="checkbox" id="featureFlags" name="featureFlags" checked={formData.featureFlags} onChange={handleChange} className="form-checkbox h-5 w-5 text-blue-600" /><span className="ml-2 text-gray-700">Enable Feature Flags</span>
        </label>
      </div>
      <div className="flex items-center justify-between">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Create Token
        </button>
      </div>
    </form>
  </div>
);
}