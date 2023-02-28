import { React, useState } from "react";
import ThreeScene from "./components/ThreeScene";
import logo from "./imgs/logo.png"
import { inputStyle } from "./styles/muiStyles";
import TextField from '@mui/material/TextField'
import validator from "validator";
import axios from "axios";
const App = (props) => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [sub, setSub] = useState("");
  const handleShit = (valid, subMsg) => {
    let updatesub = (valid, subMsg) => {
      console.log(subMsg, valid);
      return new Promise((resolve, reject) => {
        setSub(subMsg)
        resolve("success");
      });
    };
    updatesub(valid, subMsg);
  }
  const handleSubmit =  () => {
    if (email === "" || name === "" || company === "") {
      handleShit(true, "Please complete the form.");
      return;
    }
    if (validator.isEmail(email) === false) {
      handleShit(true, "Please enter a valid email.");
      return;
    }

    var subMsg;
    var valid;
    handleShit(true, "sending...");
    axios
      .post(
        "https://wa5lx5ohq2.execute-api.us-east-2.amazonaws.com/default/populusEmails?name=" +
          name +
          "&company=" +
          company + "&email=" + email
      )
      .then((response) => {
        // if (response) {
        //   console.log(response);
        //   valid = true;
        //   if (response.data === "clone") {
        //     subMsg = "We already have your email in our database :)";
        //   } else if (response.data === "good") {
        //     subMsg = "Response Recorded";
        //   } else {
        //     subMsg = "Invalid Entry";
        //   }
        // }
        subMsg = "Response Recorded";

      })
      .catch(() => {
        subMsg = "Server Failure: Try again.";
        valid = false;
      })
      .finally(() => {
        handleShit(valid, subMsg);
      });
  }
  
  return (
    <div className="main">
      <div className="row">
        <div className="leftCol">
          <div className="mainHomeTextDiv">
            <div className="mainHomeTextDivInner">
              <div className="populusLogoDiv">
                <img src={logo} alt="populus logo" className="img" />
              </div>
              <p className="mainText">Sign up for Populus Beta</p>
              <TextField size="small" value={name} onChange={(e) => {
                setName(e.target.value)
              }} id="outlined-basic" label="Name" variant="outlined" sx={inputStyle} /><br />
              <TextField size="small" value={company} onChange={(e) => {
                setCompany(e.target.value)
              }} id="outlined-basic" label="Company" variant="outlined" sx={inputStyle} /><br />
              <TextField size="small" value={email} onChange={(e) => {
                setEmail(e.target.value)
              }} id="outlined-basic" label="Email" variant="outlined" sx={inputStyle} /><br />
              <button onClick={()=> handleSubmit()}className="formButton">Submit</button>
              <div className="minHeight"><i className="sub">{sub}</i></div>
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
