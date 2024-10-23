'use client';

import React from 'react';
import PropertyOrganizerLogin from '../../components/PropertyOrganizerLogin/PropertyOrganizerLogin';
import NavBar from '../../components/Navbar/navbar';
import Head from 'next/head';

const PropertyOrganizerPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Property Organizer</title>
        <meta
          name="description"
          content="Login to the Property Organizer to manage your saved properties."
        />
      </Head>
      <NavBar />
      <main>
        <div style={{ padding: '20px' }}>
          <PropertyOrganizerLogin />
        </div>
      </main>
    </>
  );
};

export default PropertyOrganizerPage;
