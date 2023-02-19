import * as fs from 'fs';
export default async function handler(req,res){
    if(req.method === "POST"){
        let data = await fs.promises.readdir('contectdata');
        fs.promises.writeFile(`contectdata/${data.length+1}.json`,JSON.stringify(req.body));
        res.status(200).json(req.body); 
    }else if(req.method === "GET"){
        res.status(404).json(JSON.stringify('Invalid'));
    }
}