import { useState } from "react";
import NoteContext from "./noteContext";



const NoteState=(props)=>{
const notesinitial=[
    {
        "_id": "116203d838821b056578bfe53f",
        "user": "6203c3ae7a173935e70f12c4",
        "title": "my title 1",
        "description": "Write a diary daily to recall your memory",
        "tag": "personal",
        "date": "2022-02-09T15:05:28.717Z",
        "__v": 0
      },
      {
        "_id": "262103d893821b056578bfe542",
        "user": "6203c3ae7a173935e70f12c4",
        "title": "my title 1",
        "description": "Write a diary daily to recall your memory",
        "tag": "personal",
        "date": "2022-02-09T15:06:59.637Z",
        "__v": 0
      },
      {
        "_id": "362031d89a821b056578bfe544",
        "user": "6203c3ae7a173935e70f12c4",
        "title": "my title 2",
        "description": "Write a diary daily to recall your memory",
        "tag": "personal",
        "date": "2022-02-09T15:07:06.242Z",
        "__v": 0
      },
      {
        "_id": "46203d81a0821b056578bfe546",
        "user": "6203c3ae7a173935e70f12c4",
        "title": "my title 3",
        "description": "Write a diary daily to recall your memory",
        "tag": "personal",
        "date": "2022-02-09T15:07:12.798Z",
        "__v": 0
      },
      {
        "_id": "56203d8a78241b056578bfe54a",
        "user": "6203c3ae7a173935e70f12c4",
        "title": "my title 4",
        "description": "Write a diary daily to recall your memory",
        "tag": "personal",
        "date": "2022-02-09T15:07:19.966Z",
        "__v": 0
      }
]
const [notes,setNotes]=useState(notesinitial)

//Add Note
const addNote=(title,description,tag)=>{
  console.log("Adding a New Note")
  //Todo API Call
  const note={
    "_id": "56203d8a7821b056578bfe54a",
        "user": "6203c3ae7a173935e70f12c4",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2022-02-09T15:07:19.966Z",
        "__v": 0
  }
setNotes(notes.concat(note))
}
//Delete Note
const deleteNote=(id)=>{
  //ToDo with API Call
  console.log("Deleting the note with id"+id)
  const newNotes=notes.filter((note)=> {return note._id!==id})
  setNotes(newNotes)
}
//Edit Note

const editNote=()=>{
  
}
return(
      <NoteContext.Provider value={{notes,addNote,editNote,deleteNote}}>
        {props.children}
    </NoteContext.Provider>
)
}

export default NoteState