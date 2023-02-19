import React, { useState } from 'react'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

const Navbar = () => {
  const [vis, setVis] = useState(styles.mob)
  const [vis2, setVis2] = useState(styles.mobnav)
  const mob2 = ()=>{
    setVis(styles.mob2)
    setVis2(styles.mobnav2)
}

const handleClose = () => {
  setVis(styles.mob)
}
  return (
    <>
      <div className={styles.container}>
      <div className={styles.logoContainer}>
      <Link href='/'><img src='/logo.png' alt='logo'  className={styles.logo}/></Link>
      <Link href='/'><p>CODE HUNTING</p></Link>
      </div>
     <nav className={styles.mainnav}>
        <ul>
        <Link href='/'><li>Home</li></Link>
        <Link href='/Blog'><li>Blog</li></Link>
        <Link href='/About'><li>About</li></Link>
        <Link href='/ContectUs'><li>Contect Us</li></Link>
        </ul>
    </nav>
    <nav >
      <button className={vis2} type='button' onClick={mob2} >manu</button>      
    </nav>
    </div>
    <dir>
    <nav className={vis}>
        <ul>
        <Link href='/'><li>Home</li></Link>
        <Link href='/Blog'><li>Blog</li></Link>
        <Link href='/About'><li>About</li></Link>
        <Link href='/ContectUs'><li>Contect Us</li></Link>
        </ul>
      <button className={vis2}  type='button' onClick={handleClose} >Close</button>      
    </nav>
    </dir>
    </>

  )
}

export default Navbar