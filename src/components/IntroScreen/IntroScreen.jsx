import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import { audioManager } from '../../utils/audioManager';
import './IntroScreen.css';

export const IntroScreen = ({ onOpenSurprise }) => {
  const handleOpenClick = () => {
    audioManager.startBgMusic();
    audioManager.playToneEffect('chime');
    if (onOpenSurprise) {
      onOpenSurprise();
    }
  };

  return (
    <div className="intro-screen-container">
      {/* Background ambient radial glows */}
      <div className="glow-orb orb-1" />
      <div className="glow-orb orb-2" />

      <motion.div
        className="intro-content-card glass-card"
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="intro-badge"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <Sparkles size={16} className="badge-icon" />
          <span>A Private Digital Birthday Experience</span>
        </motion.div>

        <motion.p
          className="mysterious-line"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Someone made something special for you...
        </motion.p>

        <motion.h1
          className="intro-title text-shimmer romantic-font"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          Happy Birthday, {birthdayConfig.girlfriendName}
        </motion.h1>

        <motion.p
          className="intro-subtext"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          Tap to open your surprise ✨
        </motion.p>

        <motion.button
          onClick={handleOpenClick}
          className="btn-primary intro-start-btn animate-pulse-glow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Open Your Surprise</span>
          <Heart size={18} fill="#ffffff" />
        </motion.button>
      </motion.div>
    </div>
  );
};
