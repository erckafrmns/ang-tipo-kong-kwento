import React from 'react';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import LoSi from './pages/Login&SignUp/LoSi'; 
import Main from './pages/Main/Main'; 
import Custom from './pages/CustomGenerate/Custom';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; 

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      {/* Render Navbar only if not on the /signup route */}
      {/* {location.pathname !== '/signup' && <Navbar />} */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LoSi" element={<LoSi />} /> 
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

