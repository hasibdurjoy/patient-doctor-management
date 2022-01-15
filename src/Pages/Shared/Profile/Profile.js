import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [user, setUser] = useState({})
    useEffect(() => {
        fetch('http://localhost:5000/users/61e317be22bb3f3cd49c0484')
            .then(res => res.json())
            .then(data => setUser(data))
    }, [])
    return (
        <div >
            <p> this is profile of {user.name}</p>
            <img
                style={{ width: '200px', height: '200px' }}
                src={`data:image/png;base64,${user.image}`} alt="" />
            <p>{user.role}</p>
        </div>
    );
};

export default Profile;