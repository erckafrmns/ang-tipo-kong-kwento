import React from 'react';
import Home from './pages/Home/Home';
import Developers from './pages/Developers/Developers';
import LoginSignup from './pages/LoginSignup/LoginSignup'; 
import ContactUs from './pages/ContactUs/ContactUs';
import TermsOfUse from './pages/TermsOfUse/TermsOfUse';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import Guidelines from './pages/Guidelines/Guidelines';
import OtherPolicies from './pages/OtherPolicies/OtherPolicies';
import Main from './pages/Main/Main'; 
import Custom from './pages/CustomGenerate/Custom';
import StoryPage from './pages/StoryPage/StoryPage';
import Pointer from './components/Pointer/Pointer'; // Import Pointer for global sparkle effect
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import ProtectedRoute from './components/ProtectedRoute';


const AppContent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/developers" element={<Developers />} /> 
      <Route path="/login-signup" element={<LoginSignup />} /> 
      <Route path="/contact-us" element={<ContactUs />} /> 
      <Route path="/terms-of-use" element={<TermsOfUse />} /> 
      <Route path="/privacy-policy" element={<PrivacyPolicy />} /> 
      <Route path="/guidelines" element={<Guidelines />} /> 
      <Route path="/other-policies" element={<OtherPolicies />} /> 
      <Route path="/main" element={<ProtectedRoute><Main /></ProtectedRoute>} />
      <Route path="/custom" element={<ProtectedRoute><Custom /></ProtectedRoute>} />
      <Route path="/story" element={<ProtectedRoute><StoryPage /></ProtectedRoute>} />
    </Routes>
  );
};

const App = () => (
  <Router>
    <Pointer>
      <AppContent />
    </Pointer>
  </Router>
);

export default App;
