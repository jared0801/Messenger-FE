import React from 'react';

import './InfoContainer.css';

const InfoContainer = ({ users, room }) => (
    <div className="infoContainer">
        <div>
            <h2 className="infoHeader"><i className="fas fa-location-arrow"></i> Room: {room}</h2>
        </div>
        {users ? 
        ( 
            <div>
                <h2 className="infoHeader"><i className="fas fa-users"></i> Users: </h2>
                <div className="activeContainer">
                    <h3>
                        { users.map(({ name }) => (
                            <div key={name} className="activeItem">
                                {name}
                            </div>
                        ))}
                    </h3>
                </div>
            </div>
         )
        : null}
    </div>
);

export default InfoContainer;