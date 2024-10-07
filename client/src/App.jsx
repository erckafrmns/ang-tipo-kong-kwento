import React from 'react';
import Home from './pages/Home/Home';

const App = () => {

  return (
    <>
		  <Home/>
		</>
  )

}

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

