import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import JoinForm from '../../components/JoinForm/JoinForm';
import RoomList from '../../components/RoomList/RoomList';

import './Join.css';

let socket;

const Join = ({ history }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [activeRooms, setActiveRooms] = useState([]);
    const ENDPOINT = process.env.REACT_APP_SERVER_PATH;

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
            socket.emit('disconnect');
            socket.off();
        }
    });

    const moveToChat = () => {
        history.push(`/chat?name=${name}&room=${room}`);
    }

    return (
        <div className="joinOuterContainer">
            
            <JoinForm onSuccess={moveToChat} socket={socket} name={name} setName={setName} room={room} setRoom={setRoom} />

            <RoomList rooms={activeRooms}/>
        </div>
    )
}

export default Join;