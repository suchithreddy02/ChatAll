import React, { useEffect, useState } from 'react'
import ChatBar from './ChatBar'
import ChatBody from './ChatBody.jsx'
import ChatFooter from './ChatFooter.jsx'
import '../index.css'

const ChatPage = ({ socket }) => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('messageResponse', (data) => {
            console.log("message receved: ",data)
            setMessages([...messages, data])
        })
    }, [socket, messages])


    return (
        <div className="chat">
            <ChatBar socket={socket} />
            <div className='chat__main'>
                <ChatBody messages={messages} socket={socket} />
                <ChatFooter socket={socket} />
            </div>
        </div>
    )
}

export default ChatPage