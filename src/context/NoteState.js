import { useState } from "react";
import NoteContext from "./noteContext";



const NoteState=(props)=>{

    const s1={
        "name":"Harry",
        "class":"5b"
    }
    const [state, setState]=useState(s1)
    const update=()=>{
        setTimeout(()=>{
            setState({
                "name":"Larry",
                "class":"10b"
            })
        },5000)
    }
return(
    // state:state, update:update can be written simply by state,update only
    <NoteContext.Provider value={{state,update}}>
        {props.children}
    </NoteContext.Provider>
)
}

export default NoteState