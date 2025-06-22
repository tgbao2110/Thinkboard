import React from "react"
import { useNavigate, useParams, Link } from "react-router"
import api from "../lib/api"
import toast from "react-hot-toast"
import { ArrowLeft, Trash2 } from "lucide-react"

const NoteDetailPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [note, setNote] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  //GET note:id
  React.useEffect(() => {
    const fetchNote = async () => {
      setIsLoading(true)
      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data)
      } catch (error) {
        if (error.response.status == 429)
          toast.error(
            "You've made too many requests in a short period. Try again in a few seconds"
          )
        else
          toast.error(
            error.response
              ? error.response.message
              : "Unknown Error fetching note"
          )
      } finally {
        setIsLoading(false)
        return
      }
    }
    fetchNote()
  }, [id])

  //DELETE note:id
  const handleDelete = async (e) => {
    e.preventDefault()
    if (!window.confirm("Delete this note?")) return
    setIsLoading(true)
    try {
      await api.delete(`notes/${id}`)
      toast.success("Note deleted succesfully")
      navigate("/")
    } catch (error) {
      if (error.response.status == 429)
        toast.error(
          "You've made too many requests in a short period. Try again in a few seconds"
        )
      else
        toast.error(
          error.response
            ? error.response.message
            : "Unknown Error delete note"
        )
    } finally {
      setIsLoading(false)
    }
  }

  //PUT note:id
  const handleSave = async (e) => {
    e.preventDefault()
    console.log("handleSave called!")
    if (!note.title.trim || !note.content.trim) {
      toast.error("All fields are required")
      return
    }
    setIsLoading(true)
    try {
      console.log("Sending data: ", note)
      await api.put(`/notes/${id}`, note)
      toast.success("Note updated successfully")
      navigate("/")
    } catch (error) {
      if (error.response.status == 429)
        toast.error(
          "You've made too many requests in a short period. Try again in a few seconds"
        )
      else
        toast.error(
          error.response
            ? error.response.message
            : "Unknown Error saving note"
        )
    } finally {
      setIsLoading(false)
      return
    }
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-row justify-between">
            <Link to={"/"}>
              <ArrowLeft className="size-5" />
            </Link>
          <button onClick={(e)=>handleDelete(e)} className="btn btn-error btn-outline">
              <Trash2 className="size-5" />
              <span>Delete Note</span>
            </button>
          </div>

          <div className="card">
            <div className="card-body">
              <form onSubmit={(e) => handleSave(e)}>
                <div className="form-control mb-4">
                  <label className="label">Title</label>
                  {note ? (
                    <input
                      type="text"
                      placeholder="Note title"
                      className="input input-bordered"
                      value={note.title}
                      onChange={(e) =>
                        setNote({ ...note, title: e.target.value })
                      }
                    />
                  ) : (
                    <div className="input input-border">Loading...</div>
                  )}
                </div>

                <div className="form-control mb-4">
                  <label className="label">Content</label>
                  {note ? (
                    <textarea
                      type="text"
                      placeholder="Enter your note here..."
                      className="textarea textarea-bordered [height:150px]"
                      value={note.content}
                      onChange={(e) =>
                        setNote({ ...note, content: e.target.value })
                      }
                    />
                  ) : (
                    <div className="textarea textarea-bordered [height:150px]">
                      Loading...
                    </div>
                  )}
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage
