import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { user, text, datetime }, name }) => {
    let isSentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();

    const formatTime = function(date) {
        const dateObj = new Date(date);
        let hours = dateObj.getHours();
        let minutes = dateObj.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // The hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        return `${hours}:${minutes} ${ampm}`;
    }

    if(user === trimmedName) {
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser
        ? (
            <div className="messageContainer justifyEnd">
                <div className="messageBox backgroundBlue">
                
                    <p className="sentText colorLight">{trimmedName} - {formatTime(datetime)}</p>
                    <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
        )
        : (
            <div className="messageContainer justifyStart">
                <div className="messageBox backgroundLight">
                    <p className="sentText">{user} - {formatTime(datetime)}</p>
                    <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
        )
    )
}

export default Message;