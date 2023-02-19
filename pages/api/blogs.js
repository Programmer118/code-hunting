import * as fs from 'fs';

export default async function handler(req, res) {
  let data = await fs.promises.readdir("blogdata")
  // data = data.slice(0,parseInt(req.query.count))
  let files;
  let allBlog = [];
  for (let index = 0; index < data.length; index++) {
    const item = data[index];
    files = await fs.promises.readFile((`blogdata/`+ item),'utf-8')
    allBlog.push(JSON.parse(files))
  }
      
    res.status(200).json(allBlog)

  //  ,(err,data)=>{
  //   let allBlogs = [];
  //   data.forEach((item)=>{
  //     fs.readFile((`blogdata/`+ item),(err,d)=>{
  //       allBlogs.push(d);
  //     })
  //   })
  // })
  // res.status(200).json(allBlogs)
}
