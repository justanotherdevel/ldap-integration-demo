import React, { useEffect, useRef, useState } from "react";
import {
  loadCaptchaEnginge,
  validateCaptcha,
  LoadCanvasTemplateNoReload,
} from "react-simple-captcha";

const CaptchaTest = ({ onCaptchaMatch }) => {
  const userCaptchaInputRef = useRef(null);
  const [isMatched, setIsMatched] = useState(false);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const doSubmit = (e) => {
    e.preventDefault();
    const user_captcha = userCaptchaInputRef.current.value;

    if (validateCaptcha(user_captcha) === true) {
      onCaptchaMatch(); // Invoke the callback function
      setIsMatched(true);
      alert("Captcha Matched");
      // loadCaptchaEnginge(6);
      // userCaptchaInputRef.current.value = "";
    } else {
      alert("Captcha Does Not Match");
      userCaptchaInputRef.current.value = "";
    }
  };

  const loadCaptchaAgain = () => {
    loadCaptchaEnginge(6);
  };

  if (!isMatched)
    return (
      <div>
        <div className="container mt-3">
          <div className="form-group">
            <div className="row border mx-0 align-items-center justify-content-between">
              <div className="col-4 mt-3 ">
                <LoadCanvasTemplateNoReload
                  reloadColor="red"
                  reloadText="reload"
                />
              </div>
              <div
                className="col-3 algin-items-center btn btn-lg"
                onClick={loadCaptchaAgain}
              >
                &#x21bb;
              </div>
            </div>
            <div className="col mt-3 ml-0 pl-0">
              <input
                placeholder="Enter Captcha Value"
                ref={userCaptchaInputRef}
                name="user_captcha_input"
                type="text"
              ></input>
            </div>
            <div className="col mt-3 ml-0 pl-0">
              <button className="btn btn-primary" onClick={doSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );

  return <></>;
};

export default CaptchaTest;
