import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserName } from "./UserNameContext";

const ChatBody = ({ messages , socket }) => {
  const navigate = useNavigate();
  const { userName } = useUserName();
  
  const handleLeaveChat = () => {
    socket.emit('removeUser', {userName , socketID: socket.id })
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <header className="chat__mainHeader">
        <p>Hangout with Colleagues</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          Leave Chat
        </button>
      </header>

      <div className="message__container">
      {messages.map((message) =>
          message.name === userName ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

       
      </div>
    </>
  );
};

export default ChatBody
