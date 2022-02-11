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
    console.log(json)

    // const note = {
    //   _id: "56203d8a7821b056578bfe54a",
    //   user: "6203c3ae7a173935e70f12c4",
    //   title: title,
    //   description: description,
    //   tag: tag,
    //   date: "2022-02-09T15:07:19.966Z",
    //   __v: 0,
    // };
    setNotes(json);
  };

  //Add Note
  const addNote = async (title, description, tag) => {
    console.log("Adding a New Note");
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

    const note = {
      _id: "56203d8a7821b056578bfe54a",
      user: "6203c3ae7a173935e70f12c4",
      title: title,
      description: description,
      tag: tag,
      date: "2022-02-09T15:07:19.966Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };
  //Delete Note
  const deleteNote = (id) => {
    //ToDo with API Call
    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  //Edit Note

  const editNote = async (id, title, description, tag) => {
    //API Call

    const response = await fetch(`${host}/api/v1/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwM2MzYWU3YTE3MzkzNWU3MGYxMmM0In0sImlhdCI6MTY0NDQxMzg3MH0.yIEAkOTiWdyfruQmF7W8UY9z8owNOz9VfhLcfyoFRgo",
      },
      body: JSON.stringify({title,description,tag}),
    });
    const json = response.json();
    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };
  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
