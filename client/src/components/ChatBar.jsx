import React, { useState, useEffect } from 'react'

const ChatBar = ({ socket }) => {
    
    const [users, setUsers] = useState([]);
    const [start, setStart] = useState(false);

    useEffect(() => {
    
        socket.on('newUserResponse', (data) => {
            console.log("users data:",data)
            setUsers(data)
        })
    }, [socket, users])

    useEffect(() => {
        setStart(false);
    
        fetch("http://localhost:4000/userData")
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setUsers(data)
            })
            .catch((err) => {
            console.error('Error fetching data:',err)
        })

    }, [start])

    return (
        <div className="chat__sidebar">
            <h2>Open Chat</h2>

            <div>
                <h4 className="chat__header">Active Users</h4>
                <div className='chat__users'>
                    {users.map((user) => (
                        <p key={user.socketID}>{user.userName}</p>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default ChatBar;