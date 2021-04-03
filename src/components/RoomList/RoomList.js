import React from 'react';
import './RoomList.css';

const RoomList = ({rooms}) => {

    let activeRooms;
    if(rooms.length > 0) {
        activeRooms = (
            <ul className="roomList">
                { rooms.map((room) => 
                    <li key={room.name}>{room.name} - {room.users} {room.users > 1 ? 'users' : 'user'}</li>
                ) }
            </ul>
        )
    } else {
        activeRooms = (
            <p>No rooms are currently being used.</p>
        )
    }

    return (
        <div className="activeRoomsContainer">
            <h2 className="heading">Currently Active Rooms</h2>
            { activeRooms }
        </div>
    )
}

export default RoomList;