const fs = require('fs');

function healthCheck(req,res,next){
    const path = './package.json';
    
    fs.readFile(path,'utf-8',
    (err,data)=>{
        if(err){
            console.log("there was an error reading package.json");
            return
        }

        try{

            const jsonData = JSON.parse(data);

            console.log('JSON data:', jsonData.dependencies)

            return res.status(200).json({
                message:"Server is running fine",
                packagesUsed:jsonData.dependencies
            })
        }
        catch(error){
            console.log(error)
        }
    }
    )
}



module.exports = {healthCheck}