import { revalidatePath } from "next/cache";
import { redirect, useRouter } from 'next/navigation'
import NavBar from '../../components/Navbar/navbar';
import SignUp from "../../components/SignUp/SignUp";
import "../globals.css";
import supabase from '../../utils/supabase/supabaseClient';
import React, { useState } from 'react';
// Local state to store form field values
const SignUpPage: React.FC = () => {

  return(
    <main>
      <header>
        <NavBar></NavBar>
      </header>

      <SignUp ></SignUp>


    </main>
  );
};

export default SignUpPage;
