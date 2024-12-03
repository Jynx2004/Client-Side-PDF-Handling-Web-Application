const genai = require("@google/generative-ai");
const genai2 = require("@google/generative-ai/server");
const path = require('path');
const PDFExtract = require('pdf.js-extract').PDFExtract;
const fpromises = require('fs').promises;
//var convertapi = require('convertapi')('secret_PxTqGPzNMp0FBwLH');

exports.Gettextpd = async (req, res) => {
  try {
    console.log(req.query);
    const filen = req.query.name;
    const name = filen;
    let d = "";

    
    
      const pdfExtractAsync = (filePath, options) => {
        return new Promise((resolve, reject) => {
          const pdfExtract = new PDFExtract();
          pdfExtract.extract(filePath, options, (err, data) => {
            if (err) {
              reject(err); // Reject the promise in case of an error
            } else {
              resolve(data.pages[0].content); // Resolve with the content
            }
          });
        });
      };

      const processPDF = async () => {
        try {
          const options = {}; // Define your options here
          console.log("Hello filepath!!");
          const filePath = path.join(__dirname, '..', 'uploads'  ,`${name}`);
          console.log(filePath); // Replace with the actual file path
          const dat = await pdfExtractAsync(filePath, options);
          //d = dat;
          console.log('Hello data', dat);

          // Process the extracted content here
          const strings = dat.map(item => item.str).join('\n');
          console.log("Writing to text");

          await fpromises.writeFile("extracted_strings.txt", strings, 'utf8');
          console.log('Text file "extracted_strings.txt" created successfully!');

          const genAI = new genai.GoogleGenerativeAI("AIzaSyA3-OeT9z_EkjriQKUhU1QgBpvpL9kPgUQ");
          const fileManager = new genai2.GoogleAIFileManager("AIzaSyA3-OeT9z_EkjriQKUhU1QgBpvpL9kPgUQ");

          const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash", // Choose a Gemini model
          });

          const uploadResponse = await fileManager.uploadFile("extracted_strings.txt", {
            mimeType: "text/plain",
            displayName: "Gemini 1.5 TEXT",
          });

          console.log(`Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`);

          const result = await model.generateContent([
            {
              fileData: {
                mimeType: uploadResponse.file.mimeType,
                fileUri: uploadResponse.file.uri,
              },
            },
            { text: "Can you print all the text content maintaining the structure in points?" },
          ]);

          let res= result.response.text();
          let responseArray=res.split("**");
          let newResponse="";
          for(let i=0;i< responseArray.length;i++)
          {
              if(i===0 || i%2 !==1){
                  newResponse +=responseArray[i];
  
              }
  
              else{
                  newResponse+="<b>" + responseArray[i] + "</b>"
              }
          }
  
          let newResponse2=newResponse.split("*").join("</br>")


          d=newResponse2;
          console.log(d);
        } catch (error) {
          console.error('Error processing PDF:', error);
        }
      };

      await processPDF();

      return res.status(200).json({
        status: 200,
        message: "Successful",
        data:d,
      });
    

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};



