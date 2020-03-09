import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import JoinForm from './JoinForm/JoinForm';

import './Join.css';

let socket;

const Join = () => {
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

    const activeRoomsList = (
        <ul className="roomList">
            { activeRooms.map((room) => 
                <li key={room.name}>{room.name} - {room.users}</li>
            ) }
        </ul>
    );

    return (
        <div className="joinOuterContainer">
            
            <JoinForm socket={socket} name={name} setName={setName} room={room} setRoom={setRoom} />

            <div className="activeRoomsContainer">
                <h2 className="heading">Currently Active Rooms</h2>
                {activeRooms.length > 0 ? activeRoomsList : <p>No rooms are currently being used.</p>}
            </div>
        </div>
    )
}

export default Join;