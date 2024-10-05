import React, {useState, useEffect} from 'react'

function App() {

  const[data, setData] = useState([{}])

  useEffect(()=>{
  
    fetch("/users").then(
      res =>res.json()
    ).then(
      data =>{
        setData(data)
        console.log(data)
      }
    )

  })

  return (
    <div>
      {(typeof data.users === 'undefined')?(
        <p>Loading...</p>
      ):(
        data.users.map((users, i) => (
          <p key={i}>{users}</p>
        ))
      )}
    </div>
  )
}

export default App