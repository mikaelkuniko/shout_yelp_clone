import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Login from './components/Login-Signup/Login';
import SignUp from './components/Login-Signup/Signup';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/User/UsersList';
import User from './components/User/User';
import BusinessDetails from './components/Business';
import { authenticate } from './store/session';

import Review from './components/Reviews'
import { allReviews } from './store/review';
import BusinessSearchPage from './components/Search';
import CreateReviewForm from './components/Reviews/CreateReviewForm';
import PageNotFound from './components/PageNotFound';
import EditReviewForm from './components/Business/BusinessReviews/EditReviewForm';
import CreateBusinessForm from './components/Business/CreateBusinessForm'
import UserFavorites from './components/User/UserFavorites';
import EditBusinessForm from './components/Business/EditBusinessForm';
import Footer from "./components/Footer";
import { businessSearch } from './store/businessReducer';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(allReviews())
      await dispatch(businessSearch('?business=&location=')) // change in backend
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Navigation loaded={loaded}/>
      <Switch>
        <Route path='/login' exact={true}>
          <Login />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUp />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/user-favorites' exact={true} >
          <UserFavorites />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <Review />
        </Route>
        <ProtectedRoute exact path='/biz/create'>
          <CreateBusinessForm/>
        </ProtectedRoute>
        <Route path='/writeareview' exact={true} >
            {/* change to the search business form
            to then redirect you to /biz/bizId/writeareview */}
        </Route>
        <Route path='/biz/search' exact={true}>
          <BusinessSearchPage/>
        </Route>
        <ProtectedRoute exact path='/biz/:bizId/edit'>
          <EditBusinessForm/>
        </ProtectedRoute>
        <ProtectedRoute path='/biz/:bizId/writeareview' exact={true} >
          <div style={{"display":"flex", 'justifyContent':"center"}}>
            <CreateReviewForm />
          </div>
        </ProtectedRoute>
        <Route path='/biz/:businessId' exact={true}>
          <BusinessDetails/>
        </Route>
        <ProtectedRoute path='/biz/:bizId/reviews/:reviewId/edit'>
            <EditReviewForm />
        </ProtectedRoute>
        <Route path='/pageNotFound'>
          <PageNotFound />
        </Route>
      </Switch>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
