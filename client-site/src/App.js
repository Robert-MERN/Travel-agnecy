import React from 'react'
import BookingFlightPage from './pages/BookingFlightPage';
import BookingFlights from './pages/BookingFlights';
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import BookingHotel from './pages/BookingHotel';
import BookingHotelPage from './pages/BookingHotelPage';
import Faq from './pages/Faq';
import PrivacyPolicy from './pages/PrivacyPolicy';
import SearchFlights from './pages/SearchFlights';
import SearchHotels from './pages/SearchHotels';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ChoosePayment from "./pages/ChoosePayment";
import Paypal from './pages/Paypal';
import Square from './pages/Square';
import { useSelector } from "react-redux";
import { selectUser } from "./redux/userSlice"



function App() {
  // trave -agency functions
  const currentUser = useSelector(selectUser);
  console.log(currentUser);

  const RequireAuth = (({ children }) => {
    return currentUser ? children : <Navigate to="/login" />
  })
  const Login = (({ children }) => {
    return currentUser ? <Navigate to="/" /> : children
  });
  const Signup = (({ children }) => {
    return currentUser ? <Navigate to="/" /> : children
  })
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/flight-checkout" element={
            <RequireAuth>
              <BookingFlightPage />
            </RequireAuth>
          } />
          <Route path="/book-flight-page" element={<BookingFlights />} />
          <Route path="/book-hotel-page" element={<BookingHotel />} />
          <Route path="/hotel-checkout" element={
            <RequireAuth>
              <BookingHotelPage />
            </RequireAuth>
          } />
          <Route path="/faq" element={<Faq />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/search-flights" element={<SearchFlights />} />
          <Route path="/search-hotels" element={<SearchHotels />} />
          <Route path="/login" element={
            <Login>
              <SignIn />
            </Login>
          } />
          <Route path="/signup" element={
            <Signup>
              <SignUp />
            </Signup>
          } />
          <Route path="/choose-payment" element={
            <RequireAuth>
              <ChoosePayment />
            </RequireAuth>
          } />
          <Route path="/paypal" element={
            <RequireAuth>
              <Paypal />

            </RequireAuth>
          } />
          <Route path="/square" element={
            <RequireAuth>
              <Square />

            </RequireAuth>
          } />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
