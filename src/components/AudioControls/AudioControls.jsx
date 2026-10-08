import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { audioManager } from '../../utils/audioManager';
import './AudioControls.css';

export const AudioControls = () => {
  const [isMuted, setIsMuted] = useState(audioManager.isMuted);

  useEffect(() => {
    setIsMuted(audioManager.isMuted);
  }, []);

  const handleToggleMute = (e) => {
    e.stopPropagation();
    const mutedState = audioManager.toggleMute();
    setIsMuted(mutedState);
  };

  return (
    <div className="audio-controls-floating">
      <button
        onClick={handleToggleMute}
        className={`audio-btn ${isMuted ? 'muted' : 'playing'}`}
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
        title={isMuted ? 'Unmute music' : 'Mute music'}
      >
        {!isMuted && <div className="music-pulse-ring" />}
        {isMuted ? (
          <VolumeX size={20} className="icon-muted" />
        ) : (
          <Volume2 size={20} className="icon-playing" />
        )}
        <Music size={14} className="icon-music-badge" />
      </button>
    </div>
  );
};
