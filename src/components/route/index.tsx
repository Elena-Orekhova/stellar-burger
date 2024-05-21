import React from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Preloader } from '../ui/preloader';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../services/store';
import { selectAuthState } from '../../services/slices/authSlice';

// Типы
type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

// Селектор для проверки состояния аутентификации
const isAuthCheckedSelector = createSelector(
  [selectAuthState],
  (authState) => authState.isAuthChecked
);
const isAuthenticatedSelector = createSelector(
  [selectAuthState],
  (authState) => authState.isAuthenticated
);

// TODO: ?убрать весь useNavigate+navigate для перенапраления страниц
// TODO: настроить правильно Защищенный маршрут
// Защищенный маршрут
export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const location = useLocation();

  // if (!isAuthChecked) {
  //   return <Preloader />;
  // }

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && isAuthenticated) {
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to={from} />;
  }

  return children;
};
