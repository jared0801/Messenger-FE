import React from 'react';

import './Input.css';

const Input = ({ message, setMessage, file, setFile, sendMessage }) => {
    
    /* Clear file name next to input after sending message */
    let fileInput;
    React.useEffect(() => {
        if(file === '') {
            fileInput.value = "";
        }
    }, [file, fileInput]);

    /* Create thumbnail before sending file */
    const FileThumb = ({ file }) => {
        if(file.type.includes("image")) {
            return <img width="50px" height="50px" src={URL.createObjectURL(file)} alt={file.name} />;
        } else {
            return (
                <span>
                    <i className="fa fa-paperclip" aria-hidden="true"></i>
                    {file.name}
                </span>
            )
        }
    };

    const FileInfo = () => {
        if(file) {
            return (
                <span>
                    {file && <FileThumb file={file} />}
                </span>
            )
        }
    }

    function handleUpload(event) {
        setFile(event.target.files[0]);
    }
    
    return (
        <form className="form">
            <input 
                className="input" 
                type="text" 
                autoFocus
                placeholder="Type a message..."
                value={message} 
                onChange={event => setMessage(event.target.value)}
                onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
            />

            <label className="fileInput">
                <input type="file" onChange={handleUpload} ref={ref=> fileInput = ref} /*accept="image/*"*/ />
                <i className="fa fa-paperclip" aria-hidden="true"></i>
                Attach a File
            </label>
            {FileInfo()}

            <button className="sendButton" onClick={(event) => sendMessage(event)}><i className="fas fa-paper-plane"></i> Send</button>
        </form>
    )
}

export default Input;