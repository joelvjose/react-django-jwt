import React,{useEffect,useState,useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext'
import { ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'

const NotePage = () => {
    const { id } = useParams();
    const [note,setNotes] = useState(null)
    let { authTokens,logoutUser } = useContext(AuthContext)
    const navigate = useNavigate() 

    useEffect(()=>{
        getNote()
    },[id])

    let getNote = async () =>{
        if (id === 'new') return

        let response = await fetch(`http://127.0.0.1:8000/api/notes-detail/${id}/`,{
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

      let updateNote = async () =>{
        let response = await fetch(`http://127.0.0.1:8000/api/notes-update/${id}/`,{
          method:'PUT',
          headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer '+ String(authTokens.access)
          },
          body: JSON.stringify(note)
        })
        let data = await response.json()
    
        if(response.status === 200){
          setNotes(data)
        }else if(response.statusText === 'Unauthorized'){
          logoutUser()
        }
          
      }

      let createNote = async () =>{
        let response = await fetch(`http://127.0.0.1:8000/api/notes-create/`,{
          method:'POST',
          headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer '+ String(authTokens.access)
          },
          body: JSON.stringify(note)
        })
        let data = await response.json()
    
        if(response.status === 200){
          setNotes(data)
        }else if(response.statusText === 'Unauthorized'){
          logoutUser()
        }
          
      }

      let deleteNote = async () =>{
        let response = await fetch(`http://127.0.0.1:8000/api/notes-delete/${id}/`,{
          method:'DELETE',
          headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer '+ String(authTokens.access)
          }
        })
        navigate('/')

        let data = await response.json()
    
        if(response.status === 200){
          setNotes(data)
        }else if(response.statusText === 'Unauthorized'){
          logoutUser()
        }
          
      }
    
      let handleSubmit =()=>{
        if (id !== 'new' && note.body === ''){
            deleteNote()
        }else if(id !== 'new'){
            updateNote()
        }else if(id === 'new' && note !== null){
            createNote()
        }
        navigate('/')
      }

  return (
    <div className='note'>
        <div className='note-header'>
            <h3>
                <Link to="/">
                    <ArrowLeft onClick={handleSubmit}/>
                </Link>
                
            </h3>
            {id !== 'new' ?(
                <button onClick={deleteNote}>Delete</button>
            ):(
                <button onClick={handleSubmit}>Done</button>
            )}
        </div>
      <textarea onChange={(e)=>setNotes({ ...note, 'body':e.target.value})} value={note?.body}></textarea>
    </div>
  )
}

export default NotePage
