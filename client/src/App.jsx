import React from 'react';
import Home from './pages/Home/Home';
import LoSi from './pages/Login&SignUp/LoSi'; 
import ContactUs from './pages/ContactUs/ContactUs'
import TermsOfUse from './pages/TermsOfUse/TermsOfUse'
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy'
import Guidelines from './pages/Guidelines/Guidelines'
import OtherPolicies from './pages/OtherPolicies/OtherPolicies'
import Main from './pages/Main/Main'; 
import Custom from './pages/CustomGenerate/Custom';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; 

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login-signup" element={<LoSi />} /> 
        <Route path="/contact-us" element={<ContactUs />} /> 
        <Route path="/terms-of-use" element={<TermsOfUse />} /> 
        <Route path="/privacy-policy" element={<PrivacyPolicy />} /> 
        <Route path="/guidelines" element={<Guidelines />} /> 
        <Route path="/other-policies" element={<OtherPolicies />} /> 
        <Route path="/main" element={<Main />} /> 
        <Route path="/custom" element={<Custom />} /> 
      </Routes>
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;


 // GET DATA FROM BACKEND
  // const[data, setData] = useState([{}])

  // useEffect(()=>{
  
  //   fetch("/users").then(
  //     res =>res.json()
  //   ).then(
  //     data =>{
  //       setData(data)
  //       console.log(data)
  //     }
  //   )

  // })

  // return (
  //   <div>
  //     {(typeof data.users === 'undefined')?(
  //       <p>Loading...</p>
  //     ):(
  //       data.users.map((users, i) => (
  //         <p key={i}>{users}</p>
  //       ))
  //     )}
  //   </div>
  // )

