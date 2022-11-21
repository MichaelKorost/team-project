import {useState, useRef, useContext} from "react";
import "./LoginForm.css";
import {AuthContext} from "../AuthContext";

function LoginForm() {
  const [registerFormVisible, setRegisterFormVisible]= useState(false);
  const password = useRef();
  const [email, setEmail] = useState("");
  const {register, login, logout, user} = useContext(AuthContext);
  const submitHandler = e => {
    e.preventDefault();
    console.log({
      email: email,
      password: password.current.value,
      doesCreateAccount: registerFormVisible
    });
    (registerFormVisible ? register : login)(email, password.current.value)
  }
  const switchFormHandler = e => {
    e.preventDefault();
    setRegisterFormVisible(!registerFormVisible);
  }
  return (
    <div className="center">
      <span onClick={logout}>logout</span>
      {user && <pre>{user.email}</pre>}
      <h1>{registerFormVisible ? "Regsiter" : "Login"}</h1>
      <form onSubmit={submitHandler}>
        <div className="txt_field">
          <input type="email" required onChange={e => setEmail(e.target.value)} />
          <span></span>
          <label>E-mail</label>
        </div>
        <div className="txt_field" >
          <input type="password" required ref={password} />
          <span></span>
          <label>Password</label>
        </div>
        <input type="submit" value={registerFormVisible ? "Sign Up" : "Login"} />
        <div className="singuplogin_link">
			{
				<>
					<a href="#a" onClick={switchFormHandler}>Singup</a>
				</>
			}
		</div>
      </form>
    </div>
  );
}

export default LoginForm;