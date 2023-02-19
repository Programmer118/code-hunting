import React, { useEffect, useState } from 'react'
import styles from '../../styles/Blogpost.module.css'
import * as fs from 'fs'


const Post = (props) => {

  function createMarkup(c){
    return {__html:c}
  }
  const [blog, setBlog] = useState(props.Blog)
    return (
    <div className={styles.container}>
      <main className={styles.main}> 
        <h1>Blog</h1>
        <h2>{blog&&blog.title}</h2>
        <br/><br/>
        {blog && <div dangerouslySetInnerHTML={createMarkup(blog.content)}></div>}
          
      
      </main>
    </div>
  )
}
//Server Side Rendering
/**
 * It fetches data from the API and returns it as props to the page.
 * @param context - This is the context object that Next.js passes to the getServerSideProps function.
 * @returns The data from the API call is being returned.
 */
// export async function getServerSideProps(context){
//       const {Post} = context.query;
//       let data = await fetch(`http://localhost:3000/api/getblog?slug=${Post}`)
//       let Blog = await data.json();
      
//       return{
//         props:{Blog}
//     }
//   }

export async function getStaticPaths(){
  return{
    paths:[
    //   {params:{slug:"how-to-learn-flask"}},
    //   {params:{slug: "best-places-to-visit-in-delhi"}}
    ],
    fallback:true,
  }
}


export async function getStaticProps(context){
  const {Post} = context.params
  let Blog = await fs.promises.readFile(`blogdata/${Post}.json`,'utf-8')
    return {
      props:{Blog:JSON.parse(Blog)}
    }
  }    

export default Post