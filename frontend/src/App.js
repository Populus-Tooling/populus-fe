import React from "react";
import ThreeScene from "./components/ThreeScene";
const App = (props) => {
  return (
    <div className="main">
      <ThreeScene />
     
      <div className="mainHome">
        <div className="titleDiv">
          <p className="titleHome">POPULUS</p>
          <p className="subtitleHome">the future of how we collaborate</p> 
        </div>
      </div>
    </div>
  );
};
export default App;
