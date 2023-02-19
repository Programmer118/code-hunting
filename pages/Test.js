import Link from "next/link";
import React, { useEffect, useState } from "react";
import style from "../styles/Blog.module.css";
import * as fs from "fs";
import InfiniteScroll from "react-infinite-scroll-component";

import Loading from "@/components/Loading";

const Test = (props) => {
  const [blogs, setBlogs] = useState(props.allBlog);
    const [count, setCount] = useState(2)

 const fetchData = async() => {
    let d = await fetch(`/api/blogs/?count=${count}`)
    let data = await d.json()
    setBlogs(data)
    setCount(count+2)
    // a fake async api call like which sends
    // 20 more records in .5 secs
    // setTimeout(() => {
    //   this.setBlogs({
    //     items: this.state.data.concat(Array.from({ length: 10 }))
    //   });
    // }, 5000);
  };
  return (
    <>
      <div className={style.main}>
        <InfiniteScroll
          dataLength={blogs.length} //This is important field to render the next data
          next={fetchData}
          hasMore={props.bloglength !== blogs.length}
          loader={<Loading/>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          // below props only if you need pull down functionality
        //   refreshFunction={this.refresh}
        //   pullDownToRefresh
        //   pullDownToRefreshThreshold={50}
        //   pullDownToRefreshContent={
        //     <h3 style={{ textAlign: "center" }}>
        //       &#8595; Pull down to refresh
        //     </h3>
        //   }
        //   releaseToRefreshContent={
        //     <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
        //   }
       >
          {blogs.map((blogItem) => {
            return (
              <div className={style.blogItems} key={blogItem.slug}>
                <Link href={`/blogpost/${blogItem.slug}`}>
                  <h2>{blogItem.title}</h2>
                </Link>
                <div className={style.p}>
                  {blogItem.description.substr(0, 400)}
                </div>
              </div>
            );
          })}
        </InfiniteScroll>
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
  let bloglength = data.length;
  let files;
  let allBlog = [];
  for (let index = 0; index < data.length; index++) {
    const item = data[index];
    files = await fs.promises.readFile(`blogdata/` + item, "utf-8");
    allBlog.push(JSON.parse(files));
  }

  return {
    props: { allBlog,bloglength },
  };
}

export default Test;
