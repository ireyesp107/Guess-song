// import "./App.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
// import "./Layout.css"
import "./Levels.css"
import React, { useState } from "react";


export var easybool: boolean = true;

export const Levels = () => {

return (
   <><p className="levels-title">
    CHOOSE YOUR DIFFICULTY LEVEL </p>
    <>
      <nav>
        <li className="bar1" onClick={() => easybool = true}>
          <Link to="/Auto"> Easy (songs from 2000 onwards)</Link>
        </li>
        <p>






          </p>
        <li className="bar2">
          <Link to="/Auto" onClick={() => easybool = false}>Difficult (songs from all years)</Link>
        </li>
      </nav>

      <Outlet />
    </></>
      
      
 
)};





export default Levels;
// export var {easybool};




