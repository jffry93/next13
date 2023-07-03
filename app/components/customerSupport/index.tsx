'use client';
import React from 'react';
import { IoMdHelpBuoy } from 'react-icons/io';

const CustomerSupport = () => {
  const customerServiceGET = async () => {
    console.log('GET');

    const res = await fetch('/api/customerSupport');
    const json = await res.json();
    console.log(json);
  };

  const customerServicePOST = async () => {
    console.log('POST');

    const data = { text: 'i like to party!!' };

    const res = await fetch('/api/customerSupport', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    console.log(json);
  };

  return (
    <>
      <button
        className="fixed bottom-6 right-6"
        onClick={(e) => {
          customerServicePOST();
        }}
      >
        <IoMdHelpBuoy size={32} color="#bbb" />
        POST
      </button>
      <button
        className="fixed bottom-6 right-20"
        onClick={(e) => {
          customerServiceGET();
        }}
      >
        <IoMdHelpBuoy size={32} color="#bbb" />
        GET
      </button>
    </>
  );
};

export default CustomerSupport;
