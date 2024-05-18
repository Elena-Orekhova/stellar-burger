import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Preloader } from '../ui/preloader';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../services/store';

export const selectAuthState = (state: RootState) => state.auth;

export const selectIsAuthChecked = createSelector(
  [selectAuthState],
  (authState) => authState.isAuthChecked
);

type ProtectedRouteProps = {
  children: React.ReactElement;
  unAuthOnly?: boolean;
};

export const ProtectedRoute = ({
  children,
  unAuthOnly = false
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  console.log('!!!!!!', isAuthChecked);
  // if (!isAuthChecked) {
  //   return <Preloader />;
  // }

  // const isAuthenticated = true;

  if (unAuthOnly) {
    return <Navigate to='/' replace />;
  }

  if (!unAuthOnly) {
    return <Navigate to='/login' replace />;
  }

  return <Route children={children} />;
};
