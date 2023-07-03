'use client';
import React from 'react';
import { IoMdHelpBuoy } from 'react-icons/io';

const CustomerSupport = () => {
  const handleCustomerService = async () => {
    const res = await fetch('/api/customerSupport');
    const json = await res.json();
    console.log(json);
  };

  return (
    <button
      className="fixed bottom-6 right-6"
      onClick={(e) => {
        handleCustomerService();
      }}
    >
      <IoMdHelpBuoy size={32} color="#bbb" />
    </button>
  );
};

export default CustomerSupport;
