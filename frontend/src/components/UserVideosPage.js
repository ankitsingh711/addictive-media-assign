import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../axios/api';

const UserVideosPage = () => {
    const { userId } = useParams();
    const [videos, setVideos] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUserVideos = async () => {
            try {
                const response = await api.get(`/user/user-videos/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setVideos(response.data.videos);
            } catch (error) {
                console.error('Fetching user videos failed:', error);
            }
        };
        fetchUserVideos();
    }, [userId, token]);

    return (
        <div className="container">
            <h2>All Videos by User</h2>
            {videos.map((video, index) => (
                <div key={index} className="video-item">
                    <img src={video.thumbnail} alt={video.title} />
                    <h3>{video.title}</h3>
                    <p>{video.description}</p>
                </div>
            ))}
        </div>
    );
};

export default UserVideosPage;
