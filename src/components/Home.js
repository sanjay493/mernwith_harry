import React,{useContext} from "react";
import noteContext from '../context/noteContext'
const Home = () => {
  const context=useContext(noteContext)
  const {notes,setNotes}=context
  return (
    <div>
      <div className="container my-3">
      <h2>Add a Note</h2>
      <form className="my-3">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
       
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      </div>
      <div className="container my-3">
        <h2>Your Notes</h2>
        {notes.map((note)=>{
          return note.title
        })}
      </div>
      
    </div>
  );
};

export default Home;
