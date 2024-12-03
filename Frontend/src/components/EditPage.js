import React from "react";
import { useState } from "react";
//import axios from "axios";

export const EditPage = (props) => {

   const isurl=props.isurl;

    const [resp,setresponse] = useState("");
    const [show3,setshow3]=useState(false);
    //const [uploadedFileURL, setUploadedFileURL] = useState(null);
    //const [show,setshow]=useState(false);

    const nme=props.filen.name;
    const f=props.filen;

    console.log("value of file object",f);

   

    function clhandler(){


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

      GetR();


    }

    function edithandler(){

      setshow3(true);

    }


    return(
        <div>
        <div>
            EditPage
        </div>

         <button onClick={clhandler}>Click to Edit and Convert!!</button>
         <button onClick={edithandler}>Click to view the editable word file</button>
         <div>
         {show3 && resp && <iframe src={`${resp}`} title="uploaded document" width="100%" height="500px" />
        }
         </div>

        </div>

    )

}
