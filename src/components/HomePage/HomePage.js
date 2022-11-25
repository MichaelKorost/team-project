import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import Navbar from '../Navbar/Navbar';
import './HomePage.css';

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return navigate('/login');
  }
  // works but trying to make it a context\ more legit way...

  return (
    <>
      <Navbar />
      <div className='homepage-page'>
        <div className='about'>
          <h1 className='about__title'>About us</h1>
          <p className='about__desc'>
            <span className='about__desc-bold'>Blood Buddy</span> is an App that
            makes donating blood effortless. <br /> Pick a date and we'll handle
            the rest
          </p>
        </div>

        <div className='button-container'>
          <Link to='/donate'>
            <button className='donate-button'>I want to donate!</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
