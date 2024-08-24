import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axios/api';

const ListingPage = () => {
    const [users, setUsers] = useState([]); 
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllUsersVideos = async () => {
            try {
                const response = await api.get('/user/user-videos/all', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsers(response.data.users);
                console.log(response.data.users)
            } catch (error) {
                console.error('Fetching users and videos failed:', error);
            }
        };
        fetchAllUsersVideos();
    }, [token]);

    const viewAllVideos = (userId) => {
        navigate(`/user-videos/${userId}`);
    };

    return (
        <div className="container">
            <h2>All Users</h2>
            {users.map((userGroup, index) => (
                <div key={index} className="user-section">
                    <h3>{userGroup.user.first_name}</h3>
                    <img src={userGroup.user.dp} alt={userGroup.user.first_name} />
                    {userGroup.videos.slice(0, 5).map((video, idx) => (
                        <div key={idx} className="video-item">
                            <img src={video.thumbnail} alt={video.title} />
                            <p>{video.title}</p>
                        </div>
                    ))}
                    <button onClick={() => viewAllVideos(userGroup.user._id)}>View All Videos</button>
                </div>
            ))}
        </div>
    );
};

export default ListingPage;
