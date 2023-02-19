import Link from "next/link";
import React, { useEffect, useState } from "react";
import style from "../styles/Blog.module.css";
import * as fs from "fs";


const Blog = (props) => {
  const [blogs, setBlogs] = useState(props.allBlog);
  const [count, setCount] = useState(2)


  
  return (
    <>
      <div className={style.main}>
          {blogs.map((blogItem) => {
            return (
              <div className={style.blogItems} key={blogItem.slug}>
                <Link href={`/blogpost/${blogItem.slug}`}>
                  <h2>{blogItem.title}</h2>
                </Link>
                <div className={style.p}>
                  {blogItem.description.substr(0, 200)}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

/**
 * GetServerSideProps is a function that fetches data from an API and returns it as props to the page.
 * @param context - This is the context object that Next.js passes to the getServerSideProps function.
 * It contains the query object, which is the query string of the URL.
 * @returns An object with a property called props.
 */
// export async function getServerSideProps(context){
//     let data = await fetch('http://localhost:3000/api/blogs')
//     let allBlog = await data.json();

//     return {
//       props:{allBlog}
//     }
//   }
export async function getStaticProps(context) {
  let data = await fs.promises.readdir("blogdata");
  let files;
  let allBlog = [];
  for (let index = 0; index < data.length; index++) {
    const item = data[index];
    files = await fs.promises.readFile(`blogdata/` + item, "utf-8");
    allBlog.push(JSON.parse(files));
  }

  return {
    props: { allBlog },
  };
}

export default Blog;
