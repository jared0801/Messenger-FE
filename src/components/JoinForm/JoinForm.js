import React, { useState } from 'react';

import './JoinForm.css';

const JoinForm = ({ name, setName, room, setRoom, socket, onSuccess }) => {
    
    const [nameErrorMsg, setNameErrorMsg] = useState('');
    const [roomErrorMsg, setRoomErrorMsg] = useState('');

    let nameErrorDiv;
    let roomErrorDiv;

    if(nameErrorMsg) {
        nameErrorDiv = (
            <div className="errorMsg">
                <p>{nameErrorMsg}</p>
            </div>
        )
    }

    if(roomErrorMsg) {
        roomErrorDiv = (
            <div className="errorMsg">
                <p>{roomErrorMsg}</p>
            </div>
        )
    }

    

    const verifyInput = (event) => {
        // Check both fields are filled.
        if(!name || !room) {
            if(event) event.preventDefault();
            if(!name) {
                setNameErrorMsg("A name is required.");
            }
            if(!room) {
                setRoomErrorMsg("A room is required.");
            }
        }

        // Check user name is available
        socket.emit('checkUser', { name, room }, (success) => {
            if(success)
                onSuccess(name, room)
            else {
                setNameErrorMsg("Name is not available in this room.");
            }
        });
        
    }

    const roomChange = event => {
        setRoomErrorMsg('');
        setRoom(event.target.value);
    }

    const nameChange = event => {
        setNameErrorMsg('');
        setName(event.target.value);
    }

    const onKeyPress = e => {
        if(e.key === 'Enter') {
            verifyInput();
        }
    }
    
    return (
        <div className="joinFormContainer">
            <h1 className="heading">Join</h1>
            <div>
                <input id="nameInput" placeholder="Name" className={`joinInput ${nameErrorMsg ? "errorInput" : ""}`} type="text" onChange={(event) => nameChange(event)} />
                {nameErrorDiv}
            </div>
            <div>
                <input id="roomInput" onKeyPress={onKeyPress} placeholder="Room" className={`joinInput mt-20 ${roomErrorMsg ? "errorInput" : ""}`} type="text" onChange={(event) => roomChange(event)} />
                {roomErrorDiv}
            </div>

            <button className="button mt-20" type="submit" onClick={event => verifyInput(event)}>Sign In</button>
        </div>
    );
}

export default JoinForm;