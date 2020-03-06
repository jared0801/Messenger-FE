import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Join.css';

const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [nameErrorMsg, setNameErrorMsg] = useState('');
    const [roomErrorMsg, setRoomErrorMsg] = useState('');

    const verifyInput = event => {
        if(!name || !room) {
            event.preventDefault();
            if(!name) {
                setNameErrorMsg("A name is required.");
            }
            if(!room) {
                setRoomErrorMsg("A room is required.");
            }
        }
    }

    const roomChange = event => {
        setRoomErrorMsg('');
        setRoom(event.target.value);
    }

    const nameChange = event => {
        setNameErrorMsg('');
        setName(event.target.value);
    }

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

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div>
                    <input id="nameInput" placeholder="Name" className={`joinInput ${nameErrorMsg ? "errorInput" : ""}`} type="text" onChange={(event) => nameChange(event)} />
                    {nameErrorDiv}
                </div>
                <div>
                    <input id="roomInput" placeholder="Room" className={`joinInput mt-20 ${roomErrorMsg ? "errorInput" : ""}`} type="text" onChange={(event) => roomChange(event)} />
                    {roomErrorDiv}
                </div>

                <Link onClick={event => verifyInput(event)} to={`/chat?name=${name}&room=${room}`}>
                    <button className="button mt-20" type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    )
}

export default Join;