import React from "react";
import { useState } from "react";
//import PdfViewerComponent from "./PdfViewerComponent";

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

      function clhandler(){
        if(show===true)
        {
            setshow(true);
        }

        else{
            setshow(true);
        }

        console.log("Calling ClickHnadler!!");
      
    

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

      getPosts();


    }


    function chhandler(event){

        setFile(event.target.files[0]);

    }


    function dishandler(){

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
  
      getur();

    }

    console.log(f.name);

    return(
        <div>
        <div>
            <label htmlFor="pdffile">Enter the pdf</label>
            <input id="pdffile" onChange={chhandler} type="file" accept=".pdf ,.docx"/>
            <br/>
            <br/>
            <button onClick={clhandler}>Display the file content !!</button>
            <button onClick={dishandler}>Click for getting the url</button>
            <button onClick={shandler}>Click for display</button>

            <div>
                {show && <div dangerouslySetInnerHTML={{__html: txt}}></div>}
            </div>

            <div>
            {show1 && uploadedFileURL && <iframe src={`${uploadedFileURL}`} title="uploaded document" width="100%" height="500px" />}
            </div>
              
            
            
            

        </div>

        </div>


    
    )

}

