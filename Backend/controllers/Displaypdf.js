
exports.Displaypdf= async(req,res) =>{
    console.log("in the display pdf",req.body);
    const filenme=req.body.name;
    console.log("Name of file",filenme);
    console.log("Name of protocol",req.protocol);
    console.log(req.get('host'));
    let fileUrl="";

    //const nme=fileinfo.name;
    if (!req.query) {
        return res.status(400).send('No file uploaded.');
      }


      async function getu()
      {
        fileUrl = `${req.protocol}://${req.get('host')}/uploads/${filenme}`;
        console.log("URL of the file",fileUrl);

      }

      await getu();
    
      // Generate the URL for the uploaded file
      //const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${filenme}`;
      //console.log("URL of the file",fileUrl);
    
      return res.status(200).json({ 
        status:200,
        data:fileUrl
       });

}