import React, {
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  EventHandler,
  useContext,
} from "react";
import { FormEventHandler } from "react";
import "./Login.css"
import { Auto } from "../mainpage/main";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router";
import  GoogleButton  from 'react-google-button';

export const Login = (setToken: any) => {

  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate('/account');
    }
  }, [user]);

  return (
    <div>
      <h1 className='text-center text-3xl font-bold py-8'>Sign in</h1>
      <div className='max-w-[240px] m-auto py-4'>
        <GoogleButton onClick={handleGoogleSignIn} />
      </div>
    </div>
  );
};
 
  /*global google*/
  //const google = window.google;

  const client_Id =
    "620244902520-duoqn7gku0m4trn9vvfo46ssfttbm07t.apps.googleusercontent.com";

//   const onSuccess = (res: any) => {
//   };

  
//   const onFailure = (err: any) => {
//     console.log("failed:", err);
//   };
//   // return (
//   //   <div>
//   //     <GoogleLogin
//   //       clientId={client_Id}
//   //       buttonText="Sign in with Google"
//   //       onSuccess={onSuccess}
//   //       onFailure={onFailure}
//   //       cookiePolicy={"single_host_origin"}
//   //       isSignedIn={true}
//   //     />{" "}
//   //   </div>
//   // );

//   const { googleSignIn, user } = UserAuth();
//   const navigate = useNavigate();

//   const handleGoogleSignIn = async () => {
//     try {
//       await googleSignIn();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (user != null) {
//       navigate('/auto');
//     }
//   }, [user]);

//   return (
//     <div>
//       <h1 className='text-center text-3xl font-bold py-8'>Sign in</h1>
//       <div className='max-w-[240px] m-auto py-4'>
//         <GoogleButton onClick={handleGoogleSignIn} />
//       </div>
//     </div>
//   );
  

//   // const submitHandler = async e => {
//   //     e.preventDefault();
//   //     const token = await loginUser({
//   //     email,
//   //   password
//   // });
//   // setToken(token);
//   // }

//   // return(
//   //     <div className= "login">
//   // {/* <form>
//   //     <label>
//   //     <p> User email</p>
//   //     <input type="email"  placeholder="your email" value={email} onChange={e => setEmail(e.target.value)}></input>
//   //     </label>
//   //     <label>
//   //       <p>Password</p>
//   //       <input type="password" placeholder="*********" value={password} onChange={e => setPassword(e.target.value)}/>
//   //     </label>
//   //     <div>
//   //       <button type="submit" > Log in</button>
//   //     </div>
//   // </form>
//   // <button onClick={() => props.onFormSwitch('register')} className="registerButton">Don't have an account? Click to register!</button> */}
//   // </div>)
// };
 


function UserAuth(): { googleSignIn: any; user: any; } {
  throw new Error("Function not implemented.");
}

