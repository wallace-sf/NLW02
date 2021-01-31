import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import Home from './pages/Home';
import RegisterAccount from './pages/RegisterAccount';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';
import ForgotPassword from './pages/ForgotPassword';
import SuccessStep from './components/SuccessStep';
import Profile from './pages/Profile/Profile';

const Routes = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/home" component={Home} />
      <Route path="/register" component={RegisterAccount} />
      <Route path="/study" component={TeacherList} />
      <Route path="/give-classes" component={TeacherForm} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/success" component={SuccessStep} />
      <Route path="/profile" component={Profile} />
    </BrowserRouter>
  );
};

export default Routes;
