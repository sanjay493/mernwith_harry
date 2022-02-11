import React,{useState,useContext, useEffect,useRef} from 'react';
import noteContext from '../context/noteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';


const Notes = () => {
    const context=useContext(noteContext)
  const {notes,getNotes,editNote}=context
 
  useEffect(()=>{
    getNotes()
    // eslint-disable-next-line
  },[])
  const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})
  const ref=useRef(null)
  const refClose=useRef(null)

const updateNote=(currentNote)=>{
  //console.log("Edit Button Clicked")
  ref.current.click()
  setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
}

const handleClick=(e)=>{
  //console.log("updating the note...",note)
  editNote(note.id,note.etitle,note.edescription,note.etag)
  refClose.current.click()
  //addNote(note.title,note.description,note.tag)
}
const onChange=(e)=>{
 setNote({...note,[e.target.name]:e.target.value})
}

  return (<>
    <AddNote />
    
{/* Edit data-target and data-toggle to data-bs-target and data-bs-toggle */}
<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>
  <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
          <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
        {/* Start of Modal Form to edit Note */}
        <div className="container my-3">
      <h2>Add a Note</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className='form-label'>Title</label>
          <input
            type="text"
            className="form-control"
            id="etitle"
            aria-describedby="etitle"
            placeholder="Enter Title"
            name="etitle"
            value={note.etitle}
            onChange={onChange}
            minLength={3}
            required
          />

        </div>
        <div className="mb-3">
          <label htmlFor="description" className='form-label'>Description</label>
          <input
            type="text"
            className="form-control"
            id="edescription"
            placeholder="Description"
            name="edescription"
            value={note.edescription}
            onChange={onChange}
            minLength={10}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className='form-label'>Tag</label>
          <input
            type="text"
            className="form-control"
            id="etag"
            placeholder="Tag"
            name="etag"
            value={note.etag}
            onChange={onChange}
            minLength={3}
            required
          />
        </div>
        
      </form>
      </div>
        {/* End of Modal Form to edit Note */}
        </div>
        <div className="modal-footer">
          <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button disabled={note.etitle.length<3 || note.edescription.length<10 || note.etag.length<3 } onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
        </div>
      </div>
    </div>
  </div>


       <div className=" row my-3">
        <h2>Your Notes</h2>
        <div className="container"> 
        {/* If there is no else statement to show, the && sign use to show true result */}
        {notes.length===0 && 'No Notes to display'}
        </div>
        {notes.map((note)=>{
          return <NoteItem key={note._id} updateNote={updateNote} note={note} />
        })}
      </div>
  </>);
};

export default Notes;
