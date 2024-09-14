import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Profile from '../../components/Profile/Profile'
import NavBar from '../../components/Navbar/navbar'
import "../globals.css";


const Account: React.FC = () => {
  //const router = useRouter();

  // const getName = async() =>
  // {
  //   //supabase
  // }
  return (
    <main>
      <header>
        <NavBar></NavBar>
      </header>
      <div>
        <Profile></Profile>
      </div>
    </main>
  )
}

export default Account