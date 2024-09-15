import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../providers/SocketProviders';
import './Lobby.css';

function PatientLobby() {
  const [name, setName] = useState('');
  const [meetingId, setMeetingId] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const navigate = useNavigate();
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on('meeting_error', ({ message }) => {
      alert(`Error: ${message}`);
      setIsJoining(false);
    });

    return () => {
      socket.off('meeting_error');
    };
  }, [socket]);

  const joinMeeting = () => {
    if (name.trim() === '' || meetingId.trim() === '') {
      alert('Please enter your name and the meeting ID');
      return;
    }
    setIsJoining(true);
    navigate(`/room/patient/${meetingId}`, { state: { name } });
  };

  return (
    <div className="lobby-container">
      <h2 className="lobby-title">Patient's Lobby</h2>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input-field"
      />
      <input
        type="text"
        placeholder="Meeting ID"
        value={meetingId}
        onChange={(e) => setMeetingId(e.target.value)}
        className="input-field"
      />
      <button 
        onClick={joinMeeting} 
        className="action-button"
        disabled={isJoining}
      >
        {isJoining ? 'Joining...' : 'Join Meeting'}
      </button>
    </div>
  );
}

export default PatientLobby;