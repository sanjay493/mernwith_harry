import React,{useContext, useEffect} from 'react';
import noteContext from '../context/noteContext';


const About = () => {
  const a = useContext(noteContext)
  useEffect(()=>{
    a.update()
    //eslint-disable-next-line
  },[])
  return <div>This is about news  page....{a.state.name} and he is in Class {a.state.class}</div>;
};

export default About;