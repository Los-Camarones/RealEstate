import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform login logic here
    console.log("Username:", username);
    console.log("Password:", password);
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
          
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/signup">Sign up</a></p>
    </div>
  );
}

export default Login;






// export const Div = () => {
//     return (
//         <div className="div">
//             <button className="button-udw-qe">
//                 <div className="span">
//                     <div className="text-wrapper">Submit</div>
//                 </div>
//             </button>
//             <div className="div-comp">
//                 <div className="text-wrapper-2">Message</div>
//                 <div className="textarea-textarea" />
//             </div>
//             <div className="div-comp-jxbqbwrh">
//                 <div className="text-wrapper-3">Address</div>
//                 <div className="input-input-comp" />
//             </div>
//             <div className="div-comp-jxbqbwp">
//                 <div className="text-wrapper-4">Email*</div>
//                 <div className="input-input-comp-2" />
//             </div>
//             <div className="div-comp-jxbqbwqe">
//                 <div className="text-wrapper-3">Phone</div>
//                 <div className="input-input-comp" />
//             </div>
//             <div className="div-comp-jxbqbwng">
//                 <div className="text-wrapper-4">Name</div>
//                 <div className="input-input-comp-2" />
//             </div>
//         </div>
//     );
// };

