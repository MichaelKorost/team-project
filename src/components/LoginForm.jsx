import { useEffect } from "react";
import { useState, useRef } from "react";
import "./LoginForm.css";

function LoginForm() {
  const [registerFormVisible, setRegisterFormVisible] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredPasswordConfirmation, setEnteredPasswordConfirmation] =
    useState("");

  useEffect(() => {
    setIsFormValid(
      enteredPassword === enteredPasswordConfirmation &&
        enteredPassword !== "" &&
        enteredPasswordConfirmation !== "" &&
        enteredEmail !== "" &&
        enteredEmail.match("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")
    );
  }, [enteredPassword, enteredPasswordConfirmation, enteredEmail]);

  const clearInputs = () => {
    console.log("clearing inputs");
    setEnteredEmail("");
    setEnteredPassword("");
    setEnteredPasswordConfirmation("");
    setIsFormValid(false);
  };

  const switchFormHandler = (e) => {
    e.preventDefault();
    setRegisterFormVisible(!registerFormVisible);
    clearInputs();
  };

  const emailHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setEnteredPassword(e.target.value);
  };
  const passwordConfirmationHandler = (e) => {
    setEnteredPasswordConfirmation(e.target.value);
  };

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    if (
      !(
        enteredEmail.match("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$") &&
        enteredPassword !== ""
      )
    ) {
      console.log("wrong");
      return;
    }

    console.log(`${enteredEmail} with password: ${enteredPassword} LOGGED IN `);
    clearInputs();
  };

  const registerSubmitHandler = (e) => {
    e.preventDefault();
    console.log(`${enteredEmail} with password: ${enteredPassword} SIGNED UP `);
    clearInputs();
  };

  return (
    <>
      <div className={registerFormVisible ? "login animate " : "login"}>
        <h1 className="login__title">Blood Buddy </h1>

        <form className="form">
          <h1 className="login__form-title">
            {registerFormVisible ? "Regsiter" : "Login"}
          </h1>
          <div className="form__txt_field">
            <input
              type="text"
              required
              onChange={emailHandler}
              value={enteredEmail}
            />
            <span></span>
            <label>E-mail</label>
          </div>

          {!registerFormVisible && (
            <div className="form__txt_field">
              <input type="password" required onChange={passwordHandler} value={enteredPassword} />
              <span></span>
              <label>Password</label>
            </div>
          )}

          {registerFormVisible && (
            <>
              <div className="form__txt_field">
                <input
                  type="password"
                  required
                  onChange={passwordHandler}
                  value={enteredPassword}
                />
                <span></span>
                <label>Password</label>
              </div>
              <div className="form__txt_field">
                <input
                  type="password"
                  required
                  onChange={passwordConfirmationHandler}
                  value={enteredPasswordConfirmation}
                />
                <span></span>
                <label>Confirm password</label>
              </div>
              <input
                type="submit"
                value={registerFormVisible ? "Sign Up" : "Login"}
                disabled={!isFormValid}
                onClick={(e) => registerSubmitHandler(e)}
              />
            </>
          )}
          {!registerFormVisible && (
            <input
              type="submit"
              value={registerFormVisible ? "Sign Up" : "Login"}
              onClick={(e) => loginSubmitHandler(e)}
            />
          )}
          <div className="singuplogin_link">
            {registerFormVisible ? (
              <span>
                Back to &nbsp;
                <a href="#a" onClick={switchFormHandler}>
                  login page
                </a>
              </span>
            ) : (
              <span>
                Don't have an account?&nbsp;
                <a href="#a" onClick={switchFormHandler}>
                  Signup
                </a>
              </span>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
