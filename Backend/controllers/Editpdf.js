var convertapi = require('convertapi')('secret_PxTqGPzNMp0FBwLH');
const path = require('path');
//const fpromises = require('fs').promises;
exports.Editpdf = async (req,res) =>{

 try{
   const requery=req.query;

   let fileUrl="";
   let fileUrl1="";

   const filenme=requery.name;

   const filePath = path.join(__dirname, '..' ,'uploads' ,`${filenme}`); 

   const arr = filenme.split(".");
   const extn = arr[1];

  if(extn==="pdf")
  {

   async function cont(){

    try{
         
        const result = await convertapi.convert('docx', {
            File:`${filePath}`
        }, 'pdf');
    
        await result.saveFiles("C:\\Users\\AJINKYA\\MyProjects\\pdfmanipulate\\Backend\\uploads");
        console.log("File Successfully Converted to word !!!");
        const arr1=filenme.split(".");
        const filee=arr1[0]+"."+"docx";
        console.log("Modified URL :",filee);
        fileUrl = `${req.protocol}://${req.get('host')}/uploads/${filee}`;
        console.log("URL of the file",fileUrl);

    } catch(error){
        console.log("Error during conversion.",error);
    }

   }


   await cont();

   
    


    return res.status(200).json({
        status: 200,
        message: "Successful",
        data:fileUrl,
      });

  }

  else if(extn==="docx")
  {

    async function convert(){

        try{
         
            const result = await convertapi.convert('pdf', {
                File:`${filePath}`
            }, 'docx');
        
            await result.saveFiles("C:\\Users\\AJINKYA\\MyProjects\\pdfmanipulate\\Backend\\uploads");
            console.log("File Successfully Converted to pdf !!!");
            const arr2=filenme.split(".");
            const filee1=arr2[0]+"."+"pdf";
            console.log("Modified URL :",filee1);
            fileUrl1 = `${req.protocol}://${req.get('host')}/uploads/${filee1}`;
            console.log("URL of the file",fileUrl1);
    
        } catch(error){
            console.log("Error during conversion.",error);
        }

    }

    await convert();


    return res.status(200).json({
        status: 200,
        message: "Successful",
        data:fileUrl1,
      });



  }


 }catch(error){
    
    console.error("Error:", error);
    return res.status(500).json({
      status: 500,
      message: error.message,
    });

    

 }

}