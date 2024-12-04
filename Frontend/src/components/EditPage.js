import React from "react";
import { useState } from "react";
//import axios from "axios";
import './EditPage.css';

export const EditPage = (props) => {

   const isurl=props.isurl;

    const [resp,setresponse] = useState("");
    const [show3,setshow3]=useState(false);
    const [edited,setedited]=useState(false);
    //const [uploadedFileURL, setUploadedFileURL] = useState(null);
    //const [show,setshow]=useState(false);

    const nme=props.filen.name;
    const f=props.filen;

    console.log("value of file object",f);

   

    async function clhandler(){


       if(f==="" || isurl===false)
       {
          alert("File not uploaded!!");
          return ;
       } 
       

        console.log("Calling ClickHnadler!!");
      
    

        const GetR = async () => {
            try {
              
              const getText = await fetch(
                `http://localhost:4000/api/v1/editpdftext?name=${nme}`,
                {
                  method: "GET",
                  headers: {
                    accept : "application/json",
                  },
                }
      
      
              );


              const D=await getText.json();
              setresponse(D.data);
              console.log("Response ",D.data);
              
        
            } catch (error) {
              console.log(error);
            }
          };

      await GetR();

      alert("File converted to word successfully");

      setedited(true);




    }

    function edithandler(){

      setshow3(true);

    }


    return(
        <div>
        <main>
        <div className="editheader">
            EDIT FILE
        </div>

          <div className="buttonstyle">
          <button className="b" onClick={clhandler}>CLICK TO EDIT AND CONVERT</button>
          {edited && <button className="b" onClick={edithandler}>DOWNLOAD THE WORD FILE</button>}
          </div>
        
         <div>
         {show3 && resp && <iframe src={`${resp}`} title="uploaded document" width="100%" height="500px" />
        }
         </div>

        </main> 

        </div>

    )

}
