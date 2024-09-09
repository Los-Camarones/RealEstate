

// import NavBar from '../../components/Navbar/navbar';
// import React, { useState } from "react";
// import SignIn from '../../components/SignIn/SignIn';
// import Image from 'next/image';
// import { signIn } from 'next-auth/react';
// import "../globals.css";
// //import supabase from "../../utils/supabase/supabaseClient";
// import router from "next/router";

// const LoginPage: React.FC = () => {
// return(
//   <main>
//       <header>
//         <NavBar />
//       </header>
//     <div>
//       <SignIn></SignIn>
//     </div>
//   </main>
// )
// }

// export default LoginPage;


import NavBar from '../../components/Navbar/navbar';
import React, { useState } from "react";
import SignIn from '../../components/SignIn/SignIn';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import "../globals.css";
//import supabase from "../../utils/supabase/supabaseClient";
import router from "next/router";
import { createClient } from '@supabase/supabase-js';
import { kMaxLength } from 'buffer';



// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);

// export default supabase;




/*
 *******     note about this signup page file  *********
the chuncks of code below are for the background and navbar header  resizing in the sign up page, 
just some basic appeaence sitting of the website, but the  pre-built authentication component with google sign at the bottom.
are located in a different signin page under the components folder thats under this app folder. 

don't change the wrong things. 

---xuanxuan 09/06/24 @12:02PM 

*/
const LoginPage: React.FC = () => {
return(

// -> pre-built authentication component with google sign at the bottom.


  <main style={mainStyle}>
  <header style={headerStyle}>
    <NavBar />
  </header>
  <div style={containerStyle}>
    <div style={loginBoxStyle}>
      <SignIn/>
    </div>
  </div>
</main>
);
};

// Make the header take up the full width of the screen
const headerStyle = {
  width: '100%',       // Ensure the header spans full width
  backgroundColor: '#fff', // Optional: Add background color for better visibility
  padding: '8px 0',   // Optional: Add padding to give space inside the header
};


const mainStyle = {
display: 'flex',
flexDirection: 'column' as 'column',
alignItems: 'center',
justifyContent: 'center',
height: '100vh',
//background: 'linear-gradient(to right, #516b91,#e08b46, #4bab81, #cca558, #cf9d3a, #b253cf)'
backgroundImage:'url(picture2.jpg)',
backgroundSize: 'cover',
backgroudPosition: 'center',
};

const containerStyle = {
display: 'flex',
justifyContent: 'center',
alignItems: 'center',
height: '100%',
//backgroundColor: 'rgba(255, 255, 255, 0.5)', // 50% transparency,
};

const loginBoxStyle = {
padding: '40px',
borderRadius: '12px',
//backgroundColor: '#fff', // White box
backgroundColor: 'rgba(255, 255, 255, 0.5)', // 50% transparency,
boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Soft shadow
maxWidth: '500px',
kMaxLength: '650px',
width: '100%',
textAlign: 'center' as 'center',

};

export default LoginPage;
