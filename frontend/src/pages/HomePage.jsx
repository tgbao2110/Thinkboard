import React from 'react'
import Navbar from '../components/Navbar'
import RateLimited from '../components/RateLimited';
import axios from 'axios'
import {toast} from 'react-hot-toast'

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = React.useState(false)
  const [notes, setNotes] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  //GET notes
  React.useEffect(() => {
    const fetchNotes = async() =>{
      try {
        const res = await axios.get("http://localhost:5001/api/notes")
        console.log(res.data)
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
            note
            // <NoteCard key={note._id} note={note}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage