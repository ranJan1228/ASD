import React, { useState } from 'react';

const ProfileSection = () => {
    const [avatar, setAvatar] = useState('default-avatar.png');
    const [name, setName] = useState('Child Name');

    return (
        <div className="profile-section">
            <img src={avatar} alt="Avatar" className="avatar" />
            <h2>{name}</h2>
            <button onClick={() => setAvatar('new-avatar.png')}>Change Avatar</button>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
    );
};

export default ProfileSection; 