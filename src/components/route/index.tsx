import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Preloader } from '../ui/preloader';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../services/store';

// Селекторы для работы с состоянием аутентификации
export const selectAuthState = (state: RootState) => state.auth;

export const selectIsAuthChecked = createSelector(
  [selectAuthState],
  (authState) => authState.isAuthChecked
);

// Типы пропсов защищенного маршрута
type ProtectedRouteProps = {
  children: React.ReactElement;
  unAuthOnly?: boolean;
};

// Компонент защищенного маршрута
export const ProtectedRoute = ({
  children,
  unAuthOnly = false
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(selectIsAuthChecked);

  // Показываем прелоадер, пока не завершится проверка аутентификации
  // if (!isAuthChecked) {
  //   return <Preloader />;
  // }

  // Проверяем, авторизован ли пользователь
  const isAuthenticated = false;

  // Если маршрут только для неавторизованных пользователей
  if (unAuthOnly) {
    return isAuthenticated ? (
      <Navigate to='/login' replace />
    ) : (
      <Route>{children}</Route>
    );
  }

  // Если маршрут только для авторизованных пользователей
  if (!unAuthOnly) {
    return isAuthenticated ? (
      <Route>{children}</Route>
    ) : (
      <Navigate to='/profile' replace />
    );
  }

  return null;
};
