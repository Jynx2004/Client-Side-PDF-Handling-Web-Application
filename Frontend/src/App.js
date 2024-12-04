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
      <header className='header'>
        <div className='pdfnme'>
          PDF MANIPULATE
        </div>
        <nav className='navbar'>
        <Link className='links' to="/">HOME</Link>
        <Link className='links' to="/edit">EDIT</Link>
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
