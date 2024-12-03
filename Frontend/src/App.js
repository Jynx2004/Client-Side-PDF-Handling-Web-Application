import { Link, Route } from 'react-router-dom';
import './App.css';
import React from 'react';
import { Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import {EditPage} from './components/EditPage';
import { useState } from 'react';

function App() {
  //const [text,settext] = useState("");
  const [filen,setfile] = useState([]);
  const [isurl,setisurl]=useState(false);

  return (
    <div className="App">
      <div>
      <header>
        <nav>
        <Link to="/">Home</Link>
        <br/>

        <Link to="/edit">Edit</Link>

        </nav>
      </header>

      <br/>
      <br/>
      

      <main>

       <Routes>
         <Route path="/" element={<HomePage filen={filen} setFile={setfile} isurl={isurl} setisurl={setisurl}/>}/>
         <Route path="/edit" element={<EditPage filen={filen} isurl={isurl} setisurl={setisurl}/>}/>
     
      </Routes>

      </main>
      </div>
    </div>
  );
}

export default App;
