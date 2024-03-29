import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import { useNavigate } from "react-router-dom";

import './Chat.css';
import Input from '../../components/Input/Input';
import Messages from '../../components/Messages/Messages';
import InfoContainer from '../../components/InfoContainer/InfoContainer';

let socket;

const Chat = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [file, setFile] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = process.env.REACT_APP_SERVER_PATH;
    const navigate = useNavigate();

    useEffect(() => {
        const { name, room } = queryString.parse(document.location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        // Check user name is available
        socket.emit('checkUser', { name, room }, (success) => {
            if(!success)
                navigate('/');
        });

        socket.emit('join', { name, room }, () => {});

        return () => {
            //socket.emit('disconnect');
            //socket.disconnect();
            socket.off();
        }

    }, [ENDPOINT, navigate]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })

        socket.on('roomData', ({ users }) => {
            setUsers(users);
        });

        return () => {
            //socket.emit('disconnect');
            //socket.disconnect();
            socket.off();
        }
    }, [messages]);

    const sendMessage = (event) => {
        event.preventDefault();

        const payload = {};

        if(message) {
            payload.message = message;
        }
        if(file) {
            payload.file = {};
            payload.file.data = file;
            payload.file.name = file.name;
            payload.file.type = file.type;
        }
        if(message || file) {
            socket.emit('sendMessage', payload, () => {
                setMessage('');
                setFile('');
            });
        }
    }

    return (
        <div className="container">
            <div className="banner">
                <a className="header" href={process.env.PUBLIC_URL || '/'}>
                    <h1><i className="far fa-comments"></i> AMessenger Chat</h1>
                </a>
            </div>
            <div className="content">
                <InfoContainer users={users} room={room} />
                <div className="chatbox">
                    <Messages messages={messages} name={name}/>

                    <Input message={message} setMessage={setMessage} sendMessage={sendMessage} file={file} setFile={setFile} />
                </div>
            </div>
        </div>
    )
}

export default Chat;