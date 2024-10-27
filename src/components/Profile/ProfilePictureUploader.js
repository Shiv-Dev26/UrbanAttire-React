import React from 'react';

const ProfilePictureUploader = ({ onUpload }) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onUpload(file);
        }
    };

    return <input type="file" onChange={handleFileChange} />;
};

export default ProfilePictureUploader;
