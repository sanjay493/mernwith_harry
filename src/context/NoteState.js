import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesinitial = [];
  const [notes, setNotes] = useState(notesinitial);

   //Get All Notes
   const getNotes = async () => {
    //console.log("Adding a New Note");
    //Todo API Call
    const response = await fetch(`${host}/api/v1/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwM2MzYWU3YTE3MzkzNWU3MGYxMmM0In0sImlhdCI6MTY0NDQxMzg3MH0.yIEAkOTiWdyfruQmF7W8UY9z8owNOz9VfhLcfyoFRgo",
      },
       });
    const json=await response.json()
    setNotes(json);
  };

  //Add Note
  const addNote = async (title, description, tag) => {
   // console.log("Adding a New Note");
    //Todo API Call
    const response = await fetch(`${host}/api/v1/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwM2MzYWU3YTE3MzkzNWU3MGYxMmM0In0sImlhdCI6MTY0NDQxMzg3MH0.yIEAkOTiWdyfruQmF7W8UY9z8owNOz9VfhLcfyoFRgo",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note=await response.json()
    setNotes(notes.concat(note));
  };
  //Delete Note
  const deleteNote = async (id) => {
    //ToDo with API Call
    const response = await fetch(`${host}/api/v1/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwM2MzYWU3YTE3MzkzNWU3MGYxMmM0In0sImlhdCI6MTY0NDQxMzg3MH0.yIEAkOTiWdyfruQmF7W8UY9z8owNOz9VfhLcfyoFRgo",
      },
      
    });
    

    //console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  //Edit Note

  const editNote = async (id, title, description, tag) => {
    //API Call

    const response = await fetch(`${host}/api/v1/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwM2MzYWU3YTE3MzkzNWU3MGYxMmM0In0sImlhdCI6MTY0NDQxMzg3MH0.yIEAkOTiWdyfruQmF7W8UY9z8owNOz9VfhLcfyoFRgo",
      },
      body: JSON.stringify({title,description,tag}),
    });
    const json = response.json();
    //console.log(json)
    // Logic to edit in client
    const newNotes=JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      
    }
    //console.log(newNotes)
    setNotes(newNotes)
  };
  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
