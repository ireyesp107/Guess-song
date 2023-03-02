import "./App.css";
import React, { useEffect, useState } from "react";
import { Auto } from "../mainpage/main";
import { Login } from "../Dashboard/Login";
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { signInWithGoogle } from "../Dashboard/firebase";
import Home from "../homepage/Home";
import Layout from "../layout/Layout";
import About from "../howtoplaypage/About";
import Levels from "../levelspage/Levels";




//import { optionCSS } from "react-select/dist/declarations/src/components/Option"



function App() {
  const client_Id = '620244902520-duoqn7gku0m4trn9vvfo46ssfttbm07t.apps.googleusercontent.com';

  const [token, setToken] = useState();
  const [form, setForm ] = useState();

 
  
return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="Login" element={<Login />} /> */}
          <Route path="About" element={<About />} />
          <Route path="Auto" element={<Auto />} />
          <Route path="Levels" element={<Levels />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );

{/* {       
      <div className="App-header">GUESS THAT SONG</div>
       <Login/>
      <Logout/> 
     
      
      
      { <div className="game"><Auto/> </div>
      <h1>Application</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/Auto">
            <Auto />
          </Route>
        </Routes>
      </BrowserRouter> } 
    </div>
 );
} */}

}

export default App;
