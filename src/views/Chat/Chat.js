import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';
import Input from '../../components/Input/Input';
import Messages from '../../components/Messages/Messages';
import InfoContainer from '../../components/InfoContainer/InfoContainer';

let socket;

const Chat = ({ location, history }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = process.env.REACT_APP_SERVER_PATH;

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        // Check user name is available
        socket.emit('checkUser', { name, room }, (success) => {
            if(!success)
                history.push('/');
        });

        socket.emit('join', { name, room }, () => {});

        return () => {
            socket.emit('disconnect');
            socket.off();
        }

    }, [ENDPOINT, location.search, location.pathname, history]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })

        socket.on('roomData', ({ users }) => {
            setUsers(users);
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [messages]);

    const sendMessage = (event) => {
        event.preventDefault();

        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    return (
        <div className="container">
            <div className="banner">
                <a className="header" href={process.env.PUBLIC_URL || '/'}>
                    <h1><i className="far fa-comments"></i> Realtime Chat App</h1>
                </a>
            </div>
            <div className="content">
                <InfoContainer users={users} room={room} />
                <div className="chatbox">

                    <Messages messages={messages} name={name}/>

                    <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                </div>
            </div>
        </div>
    )
}

export default Chat;