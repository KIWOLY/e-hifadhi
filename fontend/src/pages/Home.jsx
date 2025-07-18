import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
      })
      .catch((err) => alert(err));
  };

  

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          alert("Note deleted");
        } else {
          alert("Failed to delete");
        }
        getNotes();
      })
      .catch((error) => alert(error));
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) {
          alert("Note created");
        } else {
          alert("Failed to make note.");
        }
        getNotes();
        setTitle("");
        setContent("");
      })
      .catch((err) => alert(err));
  };

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    navigate("/login");
  };

  return (
    <div className="home-wrapper">
      <div className="header">
        <h1>Welcome to <span className="brand">E-Hifadhi</span></h1>
        <p className="subtext">
          A secure system to store your personal notes and details privately.
        </p>
        <div className="user-info">
          
          <button className="logout-button" onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="main-content">
        <div className="notes-section">
          <h2>Your Notes</h2>
          <div className="note-list">
            {notes.length > 0 ? (
              notes.map((note) => (
                <Note note={note} onDelete={deleteNote} key={note.id} />
              ))
            ) : (
              <p>No notes found. Start by creating one below 👇</p>
            )}
          </div>
        </div>

        <div className="form-section">
          <h2>Create a Note</h2>
          <form onSubmit={createNote}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />

            <label htmlFor="content">Content:</label>
            <textarea
              name="content"
              id="content"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>

            <input type="submit" className="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
}
