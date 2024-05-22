import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';

// Типы
type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

// Защищенный маршрут
const ProtectedRoute = ({ onlyUnAuth, children }: ProtectedRouteProps) => {
  const location = useLocation();

  if (onlyUnAuth && !!getCookie('accessToken')) {
    return <Navigate to='/' />;
  }

  if (!onlyUnAuth && !getCookie('accessToken')) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
