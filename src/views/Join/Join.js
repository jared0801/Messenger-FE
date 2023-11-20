import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import JoinForm from '../../components/JoinForm/JoinForm';
import RoomList from '../../components/RoomList/RoomList';
import { useNavigate } from "react-router-dom";

import './Join.css';

let socket;

const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [activeRooms, setActiveRooms] = useState([]);
    const ENDPOINT = process.env.REACT_APP_SERVER_PATH;
    const navigate = useNavigate();

    useEffect(() => {

        // Setup socket
        socket = io(ENDPOINT);

    }, [ENDPOINT])

    useEffect(() => {
        // Update active rooms
        socket.on('getRooms', (rooms) => {
            setActiveRooms(rooms);
        })

        return () => {
            //socket.emit('disconnect');
            //socket.disconnect();
            socket.off();
        }
    });

    const moveToChat = () => {
        navigate(`/chat?name=${name}&room=${room}`);
    }

    return (
        <div className="joinOuterContainer">
            
            <JoinForm onSuccess={moveToChat} socket={socket} name={name} setName={setName} room={room} setRoom={setRoom} />

            <RoomList rooms={activeRooms}/>
        </div>
    )
}

export default Join;