import { useState } from "react";
import NoteContext from "./noteContext";



const NoteState=(props)=>{
const notesinitial=[
    {
        "_id": "6203d838821b056578bfe53f",
        "user": "6203c3ae7a173935e70f12c4",
        "title": "my title 1",
        "description": "Write a diary daily to recall your memory",
        "tag": "personal",
        "date": "2022-02-09T15:05:28.717Z",
        "__v": 0
      },
      {
        "_id": "6203d893821b056578bfe542",
        "user": "6203c3ae7a173935e70f12c4",
        "title": "my title 1",
        "description": "Write a diary daily to recall your memory",
        "tag": "personal",
        "date": "2022-02-09T15:06:59.637Z",
        "__v": 0
      },
      {
        "_id": "6203d89a821b056578bfe544",
        "user": "6203c3ae7a173935e70f12c4",
        "title": "my title 2",
        "description": "Write a diary daily to recall your memory",
        "tag": "personal",
        "date": "2022-02-09T15:07:06.242Z",
        "__v": 0
      },
      {
        "_id": "6203d8a0821b056578bfe546",
        "user": "6203c3ae7a173935e70f12c4",
        "title": "my title 3",
        "description": "Write a diary daily to recall your memory",
        "tag": "personal",
        "date": "2022-02-09T15:07:12.798Z",
        "__v": 0
      },
      {
        "_id": "6203d8a7821b056578bfe54a",
        "user": "6203c3ae7a173935e70f12c4",
        "title": "my title 4",
        "description": "Write a diary daily to recall your memory",
        "tag": "personal",
        "date": "2022-02-09T15:07:19.966Z",
        "__v": 0
      }
]
const [notes,setNotes]=useState(notesinitial)
return(
      <NoteContext.Provider value={{notes,setNotes}}>
        {props.children}
    </NoteContext.Provider>
)
}

export default NoteState