import React, { useContext, useState } from 'react';
import noteContext from '../context/noteContext';

const AddNote = () => {
    const context =useContext(noteContext)
    const {addNote}=context
 const [note,setNote]=useState({title:"",description:"",tag:"default"})
 const handleClick=(e)=>{
      e.preventDefault()
      addNote(note.title,note.description,note.tag)
    }
 const onChange=(e)=>{
     setNote({...note,[e.target.name]:e.target.value})
    }
  return (<div>
       <div className="container my-3">
      <h2>Add a Note</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            aria-describedby="title"
            placeholder="Enter Title"
            name="title"
            onChange={onChange}
          />
          <small id="title" className="form-text text-muted">
            Enter the title
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Description"
            name="description"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tag">Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            placeholder="Tag"
            name="tag"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Notes
        </button>
      </form>
      </div>
  </div>);
};

export default AddNote;
