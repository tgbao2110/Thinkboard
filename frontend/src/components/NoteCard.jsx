import React from 'react'
import {Link} from 'react-router'
import {SquarePen ,Trash2} from 'lucide-react'

import { formatDate } from '../lib/utils'

const NoteCard = ({note}) => {
  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200
      border-t-4 border-solid border-[#00FF9D]"
    >
      <div className="card-body">
        <h3 className="card-title">{note.title}</h3>
        <p className="card-content text-base-content/70 line-clamp-3 mb-4">
          {note.content}
        </p>
        <div className="card-actions justify-between items-center">
          <p className="text-base-content/60 text-sm">{formatDate(new Date(note.createdAt))}</p>
          <div className='flex items-center gap'>
            <button className="btn btn-ghost btn-xs">
              <SquarePen className="size-5" />
            </button>
            <button className="btn btn-ghost btn-xs text-error">
              <Trash2 className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default NoteCard