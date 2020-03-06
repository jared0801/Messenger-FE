import React from 'react';

import './UserContainer.css';
import onlineIcon from '../../icons/onlineIcon.png';

const UserContainer = ({ users }) => (
    <div className="userContainer">
        {users ? 
        ( 
            <div>
                <h2 className="usersHeader">People currently chatting:</h2>
                <div className="activeContainer">
                    <h3>
                        { users.map(({ name }) => (
                            <div key={name} className="activeItem">
                                {name}
                                <img alt="Online Icon" src={onlineIcon} />
                            </div>
                        ))}
                    </h3>
                </div>
            </div>
         )
        : null}
    </div>
);

export default UserContainer;