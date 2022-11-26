import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import LoadingPage from '../LoadingPage/LoadingPage';
import './LoginForm.css';

function LoginForm() {
  const [registerFormVisible, setRegisterFormVisible] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredPasswordConfirmation, setEnteredPasswordConfirmation] =
    useState('');

  const { user, register, login, isLoading, setIsLoading } =
    useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    setIsFormValid(
      enteredPassword === enteredPasswordConfirmation &&
        enteredPassword !== '' &&
        enteredPasswordConfirmation !== '' &&
        enteredEmail !== '' &&
        enteredEmail.match('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')
    );
  }, [enteredPassword, enteredPasswordConfirmation, enteredEmail]);

  // if user is logged in he shouldn't be able to reach login page- navigate to home
  // works but gives error in console
  // cannot update a component (`BrowserRouter`) while rendering a different component
  // if (user) {
  //   return navigate('/');
  // }
  // works but lags and shows login for a few sec
  // useEffect(() => {
  //   setIsLoading(true);
  //   if (user) {
  //     navigate('/');
  //   }
  // }, [user, navigate]);

  // // to prevent infinite load on logout
  // useEffect(() => {
  //   if (!user) setIsLoading(false);
  // }, []);

  const clearInputs = () => {
    console.log('clearing inputs');
    setEnteredEmail('');
    setEnteredPassword('');
    setEnteredPasswordConfirmation('');
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

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await login(enteredEmail, enteredPassword);
      setIsLoading(false);
      navigate('/');
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      // navigate('*')
    }
    /*
    david's method
const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // go to db
      await login({ email, password });
      setLoading(false);

      // navigate to a different page
      navigate("/");
    } catch (err) {
      setLoading(false);
      console.log(err);
      setError(processFirebaseErrors(err.message));
    }
  };
    */
    clearInputs();
  };

  const registerSubmitHandler = async (e) => {
    e.preventDefault();
    await register(enteredEmail, enteredPasswordConfirmation);
    clearInputs();
    navigate('/');
  };

  if (isLoading) return <LoadingPage />;

  return (
    <div className='login-page'>
      <div className={registerFormVisible ? 'login animate ' : 'login'}>
        <h1 className='login__title'>Blood Buddy </h1>

        <form className='form'>
          <h1 className='login__form-title'>
            {registerFormVisible ? 'Regsiter' : 'Login'}
          </h1>
          <div className='form__txt_field'>
            <input
              type='text'
              required
              onChange={emailHandler}
              value={enteredEmail}
            />
            <span></span>
            <label>E-mail</label>
          </div>

          {!registerFormVisible && (
            <div className='form__txt_field'>
              <input
                type='password'
                required
                onChange={passwordHandler}
                value={enteredPassword}
              />
              <span></span>
              <label>Password</label>
            </div>
          )}

          {registerFormVisible && (
            <>
              <div className='form__txt_field'>
                <input
                  type='password'
                  required
                  onChange={passwordHandler}
                  value={enteredPassword}
                />
                <span></span>
                <label>Password</label>
              </div>
              <div className='form__txt_field'>
                <input
                  type='password'
                  required
                  onChange={passwordConfirmationHandler}
                  value={enteredPasswordConfirmation}
                />
                <span></span>
                <label>Confirm password</label>
              </div>
              <input
                type='submit'
                value={registerFormVisible ? 'Sign Up' : 'Login'}
                disabled={!isFormValid}
                onClick={(e) => registerSubmitHandler(e)}
              />
            </>
          )}
          {!registerFormVisible && (
            <input
              type='submit'
              value={registerFormVisible ? 'Sign Up' : 'Login'}
              onClick={(e) => loginSubmitHandler(e)}
            />
          )}
          <div className='singuplogin_link'>
            {registerFormVisible ? (
              <span>
                Back to &nbsp;
                <a href='#a' onClick={switchFormHandler}>
                  login page
                </a>
              </span>
            ) : (
              <span>
                Don't have an account?&nbsp;
                <a href='#a' onClick={switchFormHandler}>
                  Signup
                </a>
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
