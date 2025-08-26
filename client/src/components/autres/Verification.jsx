import React, { use, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../../pages/autres/Navbar';
import Footer from '../Footer';
import { VerificationLoading } from '../../pages/autres/VerificationLoading';
import { VerificationFailed } from '../../pages/autres/VerificationFailed';
import VerificationSuccess from './VerificationSuccess';
import { verificationEmail } from '../../services/authService';

export const Verification = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('loading');
  const [user, setUser] = useState('');


  useEffect(() => {
    const token = searchParams.get('token') || '';

    if (!token) {
      setStatus('failed');
      return;
    };

    const verification = async () => {
      verificationEmail(token)
        .then(data => {
          if (data.success) {
            setStatus('success');
            setUser(data.user)
            return;
          }
          else {
            setStatus('failed');
            return;
          }

        })
        .catch(data => {
          console.log('Erreur du serveur', data.message)
          setStatus('failed');
        })
    };

    verification();

  }, []);

  if(status === 'loading') return <VerificationLoading/>;
  if(status === 'failed') return <VerificationFailed/>
  if(status === 'success') return <VerificationSuccess user={user}/>

  return  null;
};

