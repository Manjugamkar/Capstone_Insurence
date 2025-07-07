// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useState } from "react"
import { useNavigate, useNavigation } from "react-router-dom";

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [token, setToken] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5287/api/auth/login', {
//         username,
//         password
//       });
//       setToken(res.data.token);
//       localStorage.setItem('token', res.data.token);
//       alert("Login successful!");
//       navigate("/welcome");
//     } catch (err) {
//       alert("Login failed.");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input type="text" placeholder="Username" value={username}
//           onChange={(e) => setUsername(e.target.value)} required /><br/><br/>
         
//         <input type="password" placeholder="Password" value={password} 
//           onChange={(e) => setPassword(e.target.value)} required /> <br/> <br/>
//         <button type="submit">Login</button>
//       </form>
//       {token && <p>Token: {token}</p>}
//     </div>
//   );
// }

// export default Login;

// import React from 'react'

export default function Login(props) {
  let nav=useNavigate();
  let cb=props.roleCb;
  let url="http://localhost:5287/api/auth/login";
  let[login,setLogin]=useState({});
  
  let loginClick=()=>{ 
    axios.post(url,login) 
     .then((token)=>{
   //   {alert(JSON.stringify(token));

   let tokarray = token.data.split('.');
    var payload= JSON.parse( atob(tokarray[1]));  
   

      cb(payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
      nav("/main")
    }).catch()
   
  }
   let unameChange=(evt)=>{
   setLogin({...login,userName:evt.target.value});

}

    let passChange=(evt)=>{
  setLogin({...login,Password:evt.target.value});

}
  //let[role,setRole]=useState("Sales");

  return (
    <>
     <h4>Login </h4>
      <br/>
      <br/>
      <div className='row mt-4'>
        <div className='col-md-4 offset-3'>
        <div>
          <span className='form-text'>Username</span>
          <input type='text' className='form-control' id='uname' onChange={unameChange} />          
        </div>
        <div>
          <span className="form-text">Password</span>
          <input type='password' className='form-control' id='pass' onChange={passChange} />
        </div>
        <div>
          <button type='button' className="btn btn-primary" id='btn1' onClick={loginClick}>Login</button>
        </div>
        </div>
      </div>

    </>
     
  )
}

