import React, { useState } from 'react';
import style from '../styles/Home.module.css'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // add logic for sending data to back-end
    fetch(`/api/postcontect`,{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
}).then(response=> response.json())
.then(data=>{
  console.log('Successfull',data)
}).catch((error)=>{
  console.error('Error',error)
})
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    alert('Message sent!')
  };

  


  return (
    <div className={style.contain}>
    <form className={style.form} onSubmit={handleSubmit}>
      <span style={{color:'blue',fontSize:'30px'}}>Contect Us</span>
      <label>
        <input type="text" name="name" placeholder='Name' value={formData.name} onChange={handleChange} />
      </label>
      <label>
        <input type="email" name="email" placeholder='email' value={formData.email} onChange={handleChange} />
      </label>
      <label>
        <textarea name="message" placeholder='Message' value={formData.message} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    <div className={style.image}>
      <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="instagram" />
      <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="instagram" />
      <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="instagram" />
    </div>
    </form>
    </div>
  );
};

export default ContactUs;
