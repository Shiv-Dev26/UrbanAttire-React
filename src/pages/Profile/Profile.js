import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/styles/Profile.css';

const Profile = ({ handleLogout }) => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        profilepic: "",
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        dialCode: "",
        phoneNumber: "",
        role: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedFile, setSelectedFile] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                setError("User ID not found. Please log in again.");
                setLoading(false);
                return;
            }
            try {
                const token = localStorage.getItem('token');
                await axios.get(`https://localhost:7108/api/Account/GetProfileDetail`, {
                    headers: { Authorization: `Bearer ${token}` },
                }).then(response => {
                    if (response.data && response.data.data) {
                        setUserDetails(response.data.data);
                        setPreviewImage(response.data.data.profilepic);
                    } else {
                        setError("User details not found.");
                    }
                });
            } catch (err) {
                setError("Failed to fetch user details. Please try again later.");
                console.error('Fetch user details error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleUploadProfilePic = async () => {
        if (!selectedFile) {
            alert("Please select a profile picture to upload.");
            return;
        }
    
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('id', localStorage.getItem('userId')); // Change 'useriD' to 'id'
        formData.append('profilepic', selectedFile); // This should be fine
    
        try {
            await axios.post(`https://localhost:7108/api/Upload/uploadProfilePic`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            alert('Image uploaded successfully');
            // Clear selected file and preview after upload
            window.location.reload();
            setSelectedFile(""); 
            setPreviewImage(""); 
        } catch (error) {
            if (error.response) {
                console.error('Error uploading images:', error.response.data);
                alert(`Upload failed: ${JSON.stringify(error.response.data.errors) || 'Unknown error'}`);
            } else if (error.request) {
                console.error('No response received:', error.request);
                alert("No response received from the server.");
            } else {
                console.error('Error in request setup:', error.message);
                alert("Error in request setup. Please try again.");
            }
        }
    };
    
    
    

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            await axios.post(`https://localhost:7108/api/Account/updateProfile`, {
                email: userDetails.email,
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                gender: userDetails.gender,
                dialCode: userDetails.dialCode,
                phoneNumber: userDetails.phoneNumber,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            alert('Profile updated successfully!');
            window.location.reload();
        } catch (err) {
            console.error('Error updating profile:', err);
            alert("Failed to update profile. Please try again.");
        }
    };

    const handleLogoutClick = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            handleLogout();
            navigate('/');
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-pic-container">
                {previewImage && (
                    <img
                        className="profile-pic"
                        src={previewImage.startsWith('http') ? previewImage : `https://localhost:7108/${previewImage}`}
                        alt={userDetails.firstName}
                        onClick={openModal}
                    />
                )}
            </div>
            <div 
    className="form-group" 
    style={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "flex-start", 
        marginBottom: "1em" 
    }}
    >
    <label 
        htmlFor="profilepic" 
        style={{ 
            fontSize: "1rem", 
            fontWeight: "bold", 
            color: "#333", 
            marginBottom: "0.5em" 
        }}
        >
        Profile Picture:
        </label>
        <input
        type="file"
        id="profilepic"
        name="profilepic"
        onChange={handleFileChange}
        accept="image/*"
        style={{
            padding: "0.5em",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#f9f9f9",
            cursor: "pointer",
            fontSize: "0.9rem"
        }}
        />
            <button onClick={handleUploadProfilePic} className="upload-button">Upload Picture</button>
            </div>
            <form onSubmit={handleUpdateProfile}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={userDetails.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={userDetails.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userDetails.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Gender:</label>
                    <input
                        type="text"
                        id="gender"
                        name="gender"
                        value={userDetails.gender}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dialCode">Dial Code:</label>
                    <input
                        type="text"
                        id="dialCode"
                        name="dialCode"
                        value={userDetails.dialCode}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={userDetails.phoneNumber}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="update-button">Update Profile</button>
            </form>
            
            
           
            <button onClick={handleLogoutClick} className="logout-button">
                Logout
            </button>

            

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <img
                            className="large-profile-pic"
                            src={previewImage.startsWith('http') ? previewImage : `https://localhost:7108/${previewImage}`}
                            alt="Profile Preview"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
