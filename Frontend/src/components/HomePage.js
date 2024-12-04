import React from "react";
import { useState } from "react";
import './HomePage.css';
//import PdfViewerComponent from "./PdfViewerComponent";
import {ClipLoader} from "react-spinners";

export const HomePage = (props) => {

    const isurl=props.isurl;
    const setisurl=props.setisurl;
    const f=props.filen;
    const nme=props.filen.name;
    const setFile=props.setFile;

    //const [filen,setFile] = useState([]);
    const [show,setshow]=useState(false);
    const [show1,setsh]=useState(false);
    const [uploadedFileURL, setUploadedFileURL] = useState(null);
    const [txt,settext]=useState("");
    const [loading,setloading]=useState(false);

    function shandler(){

      if(uploadedFileURL==="")
      {
        alert("File not yet uploaded!!");
        return ;
      }  

      if(show1===true)
      {
        setsh(true);
      }  

      else{
        setsh(true);
      }

      

    }

      async function clhandler(){
        if(show===true)
        {
            setshow(true);
        }

        else{
            setshow(true);
        }

        console.log("Calling ClickHnadler!!");


        setloading(true);
      
    

        const getPosts = async () => {
            try {
              
              const getText = await fetch(
                `http://localhost:4000/api/v1/getpdftext?name=${f.name}`,
                {
                  method: "GET",
                  headers: {
                    accept : "application/json",
                  },
                }
      
      
              );


              const D=await getText.json();
              settext(D.data);



              console.log("Response ",D.data);
              
        
            } catch (error) {
              console.log(error);
            }
          };

      await getPosts();

      setloading(false);


    }


    function chhandler(event){

        setFile(event.target.files[0]);

    }


    async function dishandler(){

      console.log("Calling dishandler function")

      const getur = async () => {
        try {
          const formData = new FormData();
          formData.append("file", f);
          formData.append("name", nme);
          //console.log(formData);
          const UploadURL = await fetch(
            `${"http://localhost:4000/api/v1/displaypdf"}`,{
            
            
              method: "POST",
              body: formData,
  
        });

          const up=await UploadURL.json();
  
          console.log("ResponseURl ",up);
          console.log(up.data);
          setUploadedFileURL(up.data);
          if(isurl===true)
            {
              setisurl(true);
            }
            else{
              setisurl(true);
            }
          //console.log(uploadedFileURL);
          
    
        } catch (error) {
          console.log(error);
        }
      };
  
      await getur();

      alert("URL successfully generated");

    }

    console.log(f.name);

    return(
        <div>
        <div>
            <div className="inputfile">
            <label htmlFor="pdffile">ENTER THE PDF FILE : </label>
            <input id="pdffile" onChange={chhandler} type="file" accept=".pdf ,.docx"/>
            </div>
            <div className="buttons">
            {isurl && <button className="btn" onClick={clhandler}>FIRST PAGE CONTENT</button>}
            <button className="btn" onClick={dishandler}> GENERATE THE URL</button>
            {isurl && <button className="btn" onClick={shandler}>DISPLAY THE PDF</button>}
            </div>
            <div>
             {loading ? (
              <ClipLoader />
              ) : (
                      show && <div className="textstyle" dangerouslySetInnerHTML={{ __html: txt }}></div>
               )}
            </div>

            <div>
            {show1 && uploadedFileURL && <iframe src={`${uploadedFileURL}`} title="uploaded document" width="100%" height="500px" />}
            </div>
              
            
            
            

        </div>

        </div>


    
    )

}

