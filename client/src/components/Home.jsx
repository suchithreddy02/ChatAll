import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useUserName } from "./UserNameContext";

const Home = ({ socket }) => {


  const navigate = useNavigate();
  const {setUserName } = useUserName()
  const [newUserName, setNewUserName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
      
    try {
      const res = await axios.post("http://localhost:4000/register", {userName:newUserName}, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })

      setUserName(newUserName);
    }
    catch (error) {
      console.log("error at username register:",error)
    }

    
    socket.emit('newUser', {userName:newUserName , socketID: socket.id })
    navigate("/chat");
  };

  return (
    <form className="home__container" onSubmit={handleSubmit}>
      <h2 className="home__header">Sign in to Open Chat</h2>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        minLength={6}
        name="username"
        id="username"
        className="username__input"
        value={newUserName}
        onChange={(e) => setNewUserName(e.target.value)}
      />
      <button className="home__cta">SIGN IN</button>
    </form>
  );
};

export default Home;