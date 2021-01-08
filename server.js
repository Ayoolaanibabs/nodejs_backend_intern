const csvToJson = require('csvtojson');
const { json } = require('express');
const express = require('express');
const app = express();
const { v4: uuidv4 }= require('uuid');



app.use(express.json());

app.post('/', validateUrl,(req,res,next)=>{
    const input ={
        csv:{
            urls: req.body.urls,
            select_fields: req.body.select_fields
        }
    }
    let data = []
    let arr = input.csv.select_fields
    let arr1 = arr.map(x=> `'${x}'`)
    let uri = input.csv.urls
    const converter = csvToJson()
    .fromFile(`${uri}`)
    .then((json)=>{
        if (arr.length >=0){
            json.forEach((row)=>{
                var keys = Object.keys(row)
                    for(let i =0; i<keys.length; i++){
                    key = keys[i];
                    ar = arr1[i];
                    if(key == ar){
                        data.push(`${key}: ${row[key]}`);
                    }
                }
                
                })
        }
            data.push(json)
        
    
        id = uuidv4();
        output = {
            conversion_key: id,
            json:{
                data
            }
        }
        res.send(output);
    }) 
});

function validateUrl(req,res,next){
    var expression =  /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi; 
    var regex = new RegExp(expression); 
    let ret = ''
    let ur = req.body.urls;
    if (ur.match(regex)) { 
            ret = "Valid URL"; 
    } else { 
                ret = "Invalid URL"; 
            } 
           next()
}

PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`Now running on port ${PORT}!`)
})
