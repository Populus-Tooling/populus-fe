import React from "react";
import ThreeScene from "./components/ThreeScene";
import logo from "./imgs/logo.png"
const App = (props) => {
  return (
    <div className="main">
      <div className="row">
        <div className="leftCol">
          <div className="mainHomeTextDiv">
            <div className="mainHomeTextDivInner">
            <div className="populusLogoDiv">
            <img src={logo} alt="populus logo" className="img"/>
            </div>
            <p className="mainText">Sign up for the Beta</p>

            <p></p>
          </div></div>
        </div>
        <div className="rightCol">
          <ThreeScene />
          <div className="relative">
            <div className="titleDiv">
              <p className="titleHome">POPULUS</p>
              <p className="subtitleHome">
                step into the future of crowdfunding
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
