import { Notebook } from 'lucide-react'
import { Link } from 'react-router'

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center py-16 gap-y-6 max-w-md mx-auto text-center">
        <div className="bg-primary/10 p-8 rounded-full">
            <Notebook className='size-10 text-primary'/>
        </div>
        <h3 className="text-2xl font-bold">No notes yet</h3>
        <p className="text-base-content/70">
            Create your first note to get started
        </p>
        <Link to={"/create"} className='btn btn-primary'>
            Create Your First Note
        </Link>
        
    </div>
  )
}

export default NotesNotFound