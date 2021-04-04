import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { user, text, file, fileType, fileName, datetime }, name }) => {
    let isSentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();

    // Overly complicated way to open a base64 uri in a new tab
    function openBase64InNewTab (data, mimeType) {
        var byteCharacters = atob(data);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        var file = new Blob([byteArray], { type: mimeType + ';base64' });
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
    }

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

    const filePath = () => {
        return "data:" + fileType + ";base64," + file;
    }

    const GetFile = () => {
        if(file) {
            if(file.charAt(0) === '/' // jpg
            || file.charAt(0) === 'i' // png
            || file.charAt(0) === 'U' // webp
            || file.charAt(0) === 'R' // gif
            ) {
                return <img className="messageImg" onClick={() => openBase64InNewTab(file, fileType)} width="300px" src={filePath()} alt={fileName} />
            } else {
                return <p><a className="messageFile" download={fileName} href={filePath()}>{fileName}</a></p>
            }
        }
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
                    {GetFile()}
                    <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
        )
        : (
            <div className="messageContainer justifyStart">
                <div className="messageBox backgroundLight">
                    <p className="sentText">{user} - {formatTime(datetime)}</p>
                    {GetFile()}
                    <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
        )
    )
}

export default Message;