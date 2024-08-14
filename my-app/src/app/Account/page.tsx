import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import supabase from '../../utils/supabase/supabaseClient';

const Account = () => {
  //const router = useRouter();

  const getName = async() =>
  {
    //supabase
  }
  return (
    <main>
      <header>
      </header>
      <h1>Welcome to your account!</h1>
      <p>Email: julian</p>
    </main>
  )
}

export default Account