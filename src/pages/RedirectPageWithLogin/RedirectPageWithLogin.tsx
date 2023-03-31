import React, { useEffect, useState } from 'react';
import UnitedPage from '../UnitedPage/UnitedPage';
import { selectorIsUserChecked, selectorUser } from '../../store/userSlice';
import { useAppSelector } from '../../hooks/hooks';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useLoginUser from '../../hooks/useLoginUser';
import { getRedirectRoute } from '../../utils/functions';

const RedirectPageWithLogin: React.FC = () => {
  const navigate = useNavigate();
  const isAuth = !!useAppSelector(selectorUser);
  const isUserChecked = useAppSelector(selectorIsUserChecked);
  const [searchParams] = useSearchParams();

  const redirectRoute = getRedirectRoute(searchParams);
  const loginUserWithRedirect = useLoginUser(redirectRoute);

  const [shouldUseLogin, setShouldUseLogin] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  if (isUserChecked && redirectRoute) {
    if (isAuth) {
      navigate(redirectRoute);
    } else {
      if (!shouldUseLogin) {
        setShouldUseLogin(true);
      }
    }
  }

  useEffect(() => {
    if (shouldUseLogin && !isLoginOpen) {
      setIsLoginOpen(true);
      loginUserWithRedirect();
    }
  }, [shouldUseLogin, loginUserWithRedirect, isLoginOpen]);

  return <UnitedPage />;
};

export default RedirectPageWithLogin;
