import React, { useState } from 'react'
import { useUserName } from "./UserNameContext";

const ChatFooter = ({socket}) => {
    const [message, setMessage] = useState('');
    const { userName } = useUserName();

    const handleSendMessage = (e) => {
        console.log('UserName is:',userName)
        e.preventDefault()
        if (message.trim()) {
            socket.emit('message', {
                text: message,
                name: userName,
                id: `${socket.id}${Math.random()}`,
                socketID: socket.id,
            })
        }
        setMessage('');
    }

    return (
        <div className='chat__footer'>
            <form className='form' onSubmit={handleSendMessage}>
                <input
                    type="text"
                    placeholder='Write message'
                    className='message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button className='sendBtn'>send</button>
            </form>

        </div>
    )
}

export default ChatFooter;