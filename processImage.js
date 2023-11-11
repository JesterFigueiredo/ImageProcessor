const sharp =  require('sharp');
const axios = require('axios')
const fs = require('fs')
const path = require('path');
const Image = require('./model'); 

async function processImage(req,res,next){
    try{
        const url = req.body.imageUrl;

        if(!checkIfUrl(url)) return res.status(400).json({ error: 'The value provided is not a link or url' });

        console.log("this works")
        const response =  await axios.get(
            url,
            {responseType: 'arraybuffer',}
            )

        if(response.status !== 200){
            throw new Error(`Failed to fetch image. Status: ${response.status}`);
        }

        const contentType =  response.headers['content-type'];

        if(!(contentType && contentType.startsWith('image/'))){
            return res.status(422).json({message:"Unprocessable Entity"})
        }

        const grayscaleImageBuffer = await sharp(Buffer.from(response.data, 'binary'))
        .grayscale() // Apply grayscale filter
        .toBuffer();

        const croppedImageBuffer = await sharp(grayscaleImageBuffer)
        .extract({ left: 100, top: 100, width: 200, height: 200 }) 
        .toBuffer();

        const imagePath = path.join(__dirname, 'image', 'image.jpg');

        fs.writeFileSync(imagePath, croppedImageBuffer);

        const newImage =  new Image({
            imageUrl:url
        })

        newImage.save()
        .then((savedImage)=>{
            console.log("Image saved: ",savedImage)
        })
        .catch((err)=>{
            console.log(err)
        })

        return res.sendFile(imagePath)
    }
    catch(error){
        console.log(error)
    }
}


function checkIfUrl(url){
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
}

module.exports = {processImage}