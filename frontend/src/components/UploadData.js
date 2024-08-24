import React, { useState } from 'react';
import api from '../axios/api';

const UploadData = () => {
    const [bio, setBio] = useState('');
    const [videos, setVideos] = useState([]);
    const [videoTitle, setVideoTitle] = useState('');
    const [videoDescription, setVideoDescription] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [dpFile, setDpFile] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    const handleBioSubmit = async () => {
        try {
            await api.post('/upload/add-bio', { bio }, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {
            console.error('Bio update failed:', error);
        }
    };

    const handleVideoUpload = async () => {
        if (!videoFile) {
            console.error('No video file selected');
            return;
        }

        const formData = new FormData();
        formData.append('video', videoFile);
        formData.append('title', videoTitle);
        formData.append('description', videoDescription);

        try {
            await api.post('/upload/video', formData, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                }
            });
            setVideos([...videos, { title: videoTitle, description: videoDescription, thumbnail: URL.createObjectURL(videoFile) }]);
            setVideoTitle('');
            setVideoDescription('');
            setVideoFile(null);
        } catch (error) {
            console.error('Video upload failed:', error);
        }
    };

    const handleDpUpload = async () => {
        if (!dpFile) {
            console.error('No display picture file selected');
            return;
        }

        const formData = new FormData();
        formData.append('dp', dpFile);

        try {
            await api.post('/upload/upload-dp', formData, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                }
            });
            alert('DP uploaded successfully');
        } catch (error) {
            console.error('DP upload failed:', error);
        }
    };

    return (
        <div className="container">
            <h2>User Information</h2>
            <p>First Name: {user.first_name}</p>
            <p>Last Name: {user.last_name}</p>
            <p>Email: {user.email}</p>
            <p>Number: {user.number}</p>

            <button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#bioModal">Add Bio</button>
            <div className="modal fade" id="bioModal" tabIndex="-1" aria-labelledby="bioModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="bioModalLabel">Add Bio</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input type="text" className="form-control" value={bio} onChange={(e) => setBio(e.target.value)} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={handleBioSubmit} data-bs-dismiss="modal">Save Bio</button>
                        </div>
                    </div>
                </div>
            </div>

            <h3>Videos</h3>
            {videos.map((video, index) => (
                <div key={index}>
                    <img src={video.thumbnail} alt={video.title} />
                    <p>{video.title}</p>
                    <p>{video.description}</p>
                </div>
            ))}

            <button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#uploadModal">Upload Video</button>
            <div className="modal fade" id="uploadModal" tabIndex="-1" aria-labelledby="uploadModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="uploadModalLabel">Upload Video</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input type="file" className="form-control" onChange={(e) => setVideoFile(e.target.files[0])} />
                            <input 
                                type="text" 
                                className="form-control mt-2" 
                                placeholder="Title" 
                                value={videoTitle}
                                onChange={(e) => setVideoTitle(e.target.value)} 
                            />
                            <textarea 
                                className="form-control mt-2" 
                                placeholder="Description"
                                value={videoDescription}
                                onChange={(e) => setVideoDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={handleVideoUpload} data-bs-dismiss="modal">Save Video</button>
                        </div>
                    </div>
                </div>
            </div>

            <button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#dpModal">Upload DP</button>
            <div className="modal fade" id="dpModal" tabIndex="-1" aria-labelledby="dpModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="dpModalLabel">Upload Display Picture</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input type="file" className="form-control" onChange={(e) => setDpFile(e.target.files[0])} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={handleDpUpload} data-bs-dismiss="modal">Upload DP</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadData;
