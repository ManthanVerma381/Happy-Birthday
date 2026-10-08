import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, Heart } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import { audioManager } from '../../utils/audioManager';
import './SurpriseReveal.css';

export const SurpriseReveal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const surpriseData = birthdayConfig.surpriseReveal || {
    title: "One Last Special Surprise... 🎁",
    subtitle: "Tap the glowing gift box to unwrap your final birthday gift!",
    message: "Check your pillow / closet for a real-life handwritten letter & your favorite treats! Happy Birthday, my whole heart! 🌹✨",
    buttonText: "Unwrap Surprise ✨"
  };

  const handleOpenGift = () => {
    if (isOpen) return;
    setIsOpen(true);
    audioManager.playToneEffect('celebration');

    // Confetti Explosion
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#FF85A1', '#FFD166', '#FFFFFF', '#E63946']
    });
  };

  return (
    <div className="surprise-reveal-section story-section">
      <motion.div
        className="surprise-header text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="section-badge">
          <Sparkles size={16} /> Final Gift
        </span>
        <h2 className="section-title text-shimmer romantic-font">
          {surpriseData.title}
        </h2>
        <p className="section-subtext">
          {surpriseData.subtitle}
        </p>
      </motion.div>

      {/* Interactive Gift Box */}
      <div className="gift-box-wrapper">
        {!isOpen ? (
          <motion.div
            className="gift-box-container animate-pulse-glow"
            onClick={handleOpenGift}
            whileHover={{ scale: 1.08, rotate: [0, -2, 2, 0] }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="gift-ribbon-v" />
            <div className="gift-ribbon-h" />
            <div className="gift-bow">🎀</div>
            <Gift size={64} className="gift-box-icon" color="#FFFFFF" />
            <span className="unwrap-tag">{surpriseData.buttonText}</span>
          </motion.div>
        ) : (
          <motion.div
            className="surprise-revealed-card glass-card"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
          >
            <Sparkles size={48} className="revealed-sparkle-icon" />
            <p className="revealed-msg-text">{surpriseData.message}</p>
            <div className="revealed-heart-row">
              <Heart size={20} fill="var(--color-primary)" color="var(--color-primary)" />
              <Heart size={28} fill="var(--color-secondary)" color="var(--color-secondary)" />
              <Heart size={20} fill="var(--color-primary)" color="var(--color-primary)" />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
