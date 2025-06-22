import { ArrowLeft } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";

import api from "../lib/api";

const CreatePage = () => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Button Clicked");
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required")
      return
    }
    setIsLoading(true);
    try {
      await api.post("/notes", { title, content })
      toast.success("Note create succesfully")
      navigate("/")
    } catch (error) {
      if (error.response?.status==429){
        toast.error("You've made too many requests in a short period. Try again in a few seconds")
      }
      toast.error(error.response?.message)
      return
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8"></div>
      <div className="max-w-2xl mx-auto">
        <Link to={"/"}>
          <ArrowLeft className="size-5" />
        </Link>

        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Create New Note</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label">Title</label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">Content</label>
                <textarea
                  type="text"
                  placeholder="Enter your note here..."
                  className="textarea textarea-bordered [height:150px]"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div className="card-actions justify-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating note..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
