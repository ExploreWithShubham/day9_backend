import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  console.log("Hello Integeration...");

  function fetchData() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotes(res.data.note);
    });
  }
  useEffect(() => {
    fetchData();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const { title, description } = e.target.elements;

    console.log(title.value, description.value);

    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        console.log(res.data);
        fetchData();
      });
  }

  function handleDelete(noteId) {
    axios.delete("http://localhost:3000/api/notes/" + noteId)
    .then((res) => {
      console.log(res.data);
      fetchData();
    });
  }

  function handleUpdate(noteId) {
    const newDescription = prompt("Enter new description");

    if (!newDescription) return;

    axios
      .patch("http://localhost:3000/api/notes/"+noteId, {
        description: newDescription,
      })
      .then((res) => {
        console.log(res.data);
        fetchData(); // updated list reload
      })
  }

  return (
    <>
      <form className="note-created-form" onSubmit={handleSubmit}>
        <input name="title" type="text" placeholder="Enter Title here...." />
        <input
          name="description"
          type="text"
          placeholder="Enter description here...."
        />
        <button>Create Notes</button>
      </form>

      <div className="notes">
        {notes.map((note, idx) => {
          return (
            <div className="note" key={idx}>
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <div className="button">
                <button
                  onClick={() => {
                    handleDelete(note._id);
                  }}
                >
                  delete
                </button>
                <button
                  onClick={() => {
                    handleUpdate(note._id);
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
