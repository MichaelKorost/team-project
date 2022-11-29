import './ProfilePage.css';
import { Button, Typography } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import { useContext, useEffect, useState } from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ProfileEditModal from '../Modals/ProfileEditModal/ProfileEditModal';
import { AppointmentContext } from '../../contexts/AppointmentContext';
import DonateDetailsModal from '../Modals/DonateDetailsModal/DonateDetailsModal';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { db, storage } from '../../firebase/firebaseConfig';
import { AuthContext } from '../../AuthContext';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';

// TODO: view appointment details, userInfo.appointment
const ProfilePage = () => {
  const {
    dateString,
    setDateString,
    timeString,
    setTimeString,
    isConfirmed,
    setIsConfirmed,
    confirmedDate,
    setConfirmedDate,
    isEditOpen,
    setIsEditOpen,
  } = useContext(AppointmentContext);

  const { user } = useContext(AuthContext);

  const [file, setFile] = useState('');
  // const [isEditOpen, setIsEditOpen] = useState(false); //moving to ctx because of navbar
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  // uploading img
  const [percentage, setPercentage] = useState(null);
  // getting document
  const [userInfo, setUserInfo] = useState({}); //used to get user properties

  useEffect(() => {
    return async () => {
      const docRef = doc(db, 'users', user.uid);
      const docUser = await getDoc(docRef);
      console.log(docUser.data(), docUser.id);
      setUserInfo(docUser.data());
      console.log(userInfo);
    };
  }, [isEditOpen]);

  // edit modal
  const openEditModal = () => {
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
  };
  // end of edit modal

  // appointment modal
  const closeDetailsModal = () => {
    setIsDetailsOpen(false);
  };

  const openDetailsModal = () => {
    setIsDetailsOpen(true);
  };

  // end of appointment modal

  // adding img to doc

  useEffect(() => {
    const updateProfile = async (downloadURL) => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        await updateDoc(docRef, { photoURL: downloadURL });
        setUserInfo({ ...userInfo, photoURL: downloadURL });
        console.log(docRef);
      }
    };

    const uploadFile = () => {
      const name = new Date().getTime() + file.name; //used to avoid same name
      const storageRef = ref(storage, file.name); // where to upload
      console.log(name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPercentage(progress);
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            updateProfile(downloadURL);
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  return (
    <>
      <Navbar />
      <div className='profile-page-page'>
        <section className='left-pane'>
          <div className='profile-image-container'>
            <img
              className='profile__image'
              src={
                userInfo.photoURL
                  ? /*URL.createObjectURL(file)*/ userInfo.photoURL
                  : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
              }
              alt='profile'
            />
            <Button
              variant='contained'
              component='label'
              className='profile__image-button'>
              <CameraAltIcon />
              Upload
              <input
                hidden
                accept='image/*'
                type='file'
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Button>
          </div>
          <Button
            disabled={!userInfo.appointment}
            onClick={openDetailsModal}
            variant='contained'
            className='profile__appointment-button'
            style={{ margin: 'auto' }}>
            View nearest appointment details
          </Button>
        </section>
        <section className='right-pane'>
          <div className='profile-info'>
            <div className='profile-info-box'>
              <div className='profile-info-snippet'>
                <label className='profile-info__category'>First Name: </label>
                <p className='profile-info__output'>
                  {userInfo?.firstName || ''}
                </p>
              </div>
              <div className='profile-info-snippet'>
                <label className='profile-info__category'>Last Name: </label>
                <p className='profile-info__output'>
                  {userInfo?.lastName || ''}
                </p>
              </div>
              <div className='profile-info-snippet'>
                <label className='profile-info__category'>Date of birth:</label>
                <p className='profile-info__output'>{userInfo?.dob || ''}</p>
              </div>
              <div className='profile-info-snippet'>
                <label className='profile-info__category'>Phone number: </label>
                <p className='profile-info__output'>{userInfo?.phoneNumber}</p>
              </div>
              <div className='profile-info-snippet'>
                <label className='profile-info__category'>Blood Type: </label>
                <p className='profile-info__output'>
                  {userInfo?.bloodType || ''}
                </p>
              </div>
              <div className='profile-info-snippet'>
                <label className='profile-info__category'>Location: </label>
                <p className='profile-info__output'>
                  {userInfo?.location || ''}
                </p>
              </div>
              <div className='profile-info-snippet'>
                <label className='profile-info__category'>HMO:</label>
                <p className='profile-info__output'>{userInfo?.hmo || ''}</p>
              </div>
            </div>
            <Button
              variant='contained'
              onClick={openEditModal}
              className='profile__edit-btn'>
              Edit
            </Button>
          </div>
        </section>
      </div>
      <ProfileEditModal
        onOpenModal={openEditModal}
        onCloseModal={closeEditModal}
        isOpen={isEditOpen}
      />

      <DonateDetailsModal
        isOpen={isDetailsOpen}
        onCloseModal={closeDetailsModal}
        confirmedDate={userInfo?.appointment}
        onOpenModal={openDetailsModal}
      />
    </>
  );
};

export default ProfilePage;
