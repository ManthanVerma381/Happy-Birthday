import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Heart, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import { audioManager } from '../../utils/audioManager';
import './Replay.css';

export const Replay = ({ onReplayTrigger }) => {
  const handleReplayClick = () => {
    audioManager.playToneEffect('chime');
    if (onReplayTrigger) {
      onReplayTrigger();
    }
  };

  return (
    <div className="replay-section story-section">
      <motion.div
        className="replay-card glass-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Sparkles size={32} className="replay-sparkle-icon" />

        <h2 className="replay-title romantic-font">
          Hope this brought a smile to your face, {birthdayConfig.girlfriendName} ❤️
        </h2>

        <p className="replay-subtext">
          You can relive this experience anytime you want.
        </p>

        <button
          onClick={handleReplayClick}
          className="btn-primary replay-btn animate-pulse-glow"
        >
          <RotateCcw size={20} />
          <span>Replay Experience ✨</span>
        </button>

        <div className="signature-footer">
          <Heart size={14} fill="var(--color-primary)" color="var(--color-primary)" />
          <span>Made with love by {birthdayConfig.myName}</span>
        </div>
      </motion.div>
    </div>
  );
};
