import React, { useContext, useState } from 'react';
import noteContext from '../context/noteContext';

const AddNote = () => {
    const context =useContext(noteContext)
    const {addNote}=context
 const [note,setNote]=useState({title:"",description:"",tag:""})
 const handleClick=(e)=>{
      e.preventDefault()
      addNote(note.title,note.description,note.tag)
      setNote({title:"",description:"",tag:""})
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
            value={note.title}
            onChange={onChange}
            minLength={3}
            required
          />
          
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Description"
            name="description"
            value={note.description}
            onChange={onChange}
            minLength={10}
            required
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
            value={note.tag}
            onChange={onChange}
            minLength={3}
            required
          />
        </div>
        <button disabled={note.title.length<3 || note.description.length<10 || note.tag.length<3 } type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Notes
        </button>
      </form>
      </div>
  </div>);
};

export default AddNote;
