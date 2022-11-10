import { useState, useRef } from "react";
import "./LoginForm.css";

function LoginForm() {
  const [registerFormVisible, setRegisterFormVisible] = useState(false);
  const password = useRef();
  const [email, setEmail] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    console.log({
      email: email,
      password: password.current.value,
      doesCreateAccount: registerFormVisible,
    });
  };
  const switchFormHandler = (e) => {
    e.preventDefault();
    setRegisterFormVisible(!registerFormVisible);
  };
  return (
    <>
      <div className={registerFormVisible ? "login animate " : "login"}>
        <h1 className="login__title">Blood Buddy </h1>
        <form className="form" onSubmit={submitHandler}>
          <h1 className="login__form-title">
            {registerFormVisible ? "Regsiter" : "Login"}
          </h1>
          <div className="form__txt_field">
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <span></span>
            <label>E-mail</label>
          </div>
          {!registerFormVisible && (
            <div className="form__txt_field">
              <input type="password" required ref={password} />
              <span></span>
              <label>Password</label>
            </div>
          )}

          {registerFormVisible && (
            <>
              <div className="form__txt_field">
                <input type="password" required ref={password} />
                <span></span>
                <label>Password</label>
              </div>
              <div className="form__txt_field">
                <input type="password" required ref={password} />
                <span></span>
                <label>Confirm password</label>
              </div>
            </>
          )}
          <input
            type="submit"
            value={registerFormVisible ? "Sign Up" : "Login"}
          />
          <div className="singuplogin_link">
            {
              <>
                <span>
                  Don't have an account?
                  <a href="#a" onClick={switchFormHandler}>
                    Signup
                  </a>
                </span>
              </>
            }
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
