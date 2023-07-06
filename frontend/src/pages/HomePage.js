import React, { useEffect,useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import ListItems from '../components/ListItems'
import AddButton from '../components/AddButton'

const HomePage = () => {

  let [notes,setNotes] = useState([])
  let { user,authTokens,logoutUser } = useContext(AuthContext)
  useEffect(()=>{
    getNotes()
  },[])

  let getNotes = async () =>{
    let response = await fetch('http://127.0.0.1:8000/api/notes/',{
      method:'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer '+ String(authTokens.access)
      }
    })
    let data = await response.json()

    if(response.status === 200){
      setNotes(data)
    }else if(response.statusText === 'Unauthorized'){
      logoutUser()
    }
      
  }

  return (
    <div className='notes'>
      <div className='notes-header'>
        <h2 className='notes-title'>&#9782; Notes of {user.username}</h2>
        <p className='notes-count'>{notes.length}</p>
      </div>
      <div className='notes-list'>
        {notes.map((note,index) =>(
          <ListItems key = {index} note={note} />
        ))}
      </div>
      <AddButton/>
    </div>
  )
}

export default HomePage
