import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './shared/Header';
import HomePage from './home/HomePage';
import ProfilePage from './account/ProfilePage';

export default function Template() {
  return (
    <Router>
      <div className="wrapper">
        <Header username="anonymous" />
        <Route exact path="/" component={HomePage} />
        <Route path="/account/profile/:id" component={ProfilePage} />
      </div>
    </Router>
  );
}
