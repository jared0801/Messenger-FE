import React from 'react';

import './UserContainer.css';

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