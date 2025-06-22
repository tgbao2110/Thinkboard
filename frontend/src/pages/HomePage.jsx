import React from 'react'
import {toast} from 'react-hot-toast'

import Navbar from '../components/Navbar'
import RateLimited from '../components/RateLimited';
import NoteCard from '../components/NoteCard';
import api from '../lib/api';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = React.useState(false)
  const [notes, setNotes] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  //GET notes
  React.useEffect(() => {
    const fetchNotes = async() =>{
      try {
        const res = await api.get("/notes")
        setNotes(res.data)
        setIsRateLimited(false)
      } catch (error) {
        if(error.response?.status == 429){
          setIsRateLimited(true)
        }
        else{
          toast.error(error.response?.message)
        }
      } finally{
        setIsLoading(false)
      }
    };
    fetchNotes();
  }, [])

  return (
    <div className='min-h-screen'>
      <Navbar/>
      {isRateLimited && <RateLimited/>}
      <div className='max-w-7xl mx-auto mt-6'>
        {isLoading && <div className='text-primary text-center'>Loading notes...</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {notes.map(note =>(
            <NoteCard key={note._id} note={note} setNotes={setNotes}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage