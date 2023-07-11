const File = require("../../../models/files/file");

module.exports ={
    async uploadFile(req,res){
        try {
            const { fileName, filePath, uploadedBy } = req.body;
        
            const file = new File({
              fileName,
              filePath,
              uploadedBy,
            });
        
            await file.save();
        
            res.status(201).json({ message: 'File uploaded and details saved successfully' });
          } catch (error) {
            console.error('Error uploading file:', error);
            res.status(500).json({ error: 'An error occurred while uploading the file' });
          }
    }
}