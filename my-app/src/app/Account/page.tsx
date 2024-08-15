import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Profile from '../../components/Profile/profile'

const Account: React.FC = () => {
  //const router = useRouter();

  // const getName = async() =>
  // {
  //   //supabase
  // }
  return (
    <main>
      <header>
      </header>
      <div>
        <Profile></Profile>
      </div>
    </main>
  )
}

export default Account