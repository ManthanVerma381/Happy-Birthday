import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Sun, Music, Heart, Home, Star, Eye } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import { audioManager } from '../../utils/audioManager';
import './LoveReasons.css';

export const LoveReasons = () => {
  const [flippedCards, setFlippedCards] = useState({});

  const iconMap = {
    Sun: <Sun size={24} color="#FFD166" />,
    Music: <Music size={24} color="#FF85A1" />,
    Sparkles: <Sparkles size={24} color="#FF6584" />,
    Heart: <Heart size={24} fill="#FF85A1" color="#FF85A1" />,
    Home: <Home size={24} color="#D4A373" />,
    Star: <Star size={24} color="#FFD166" />
  };

  const handleCardFlip = (id) => {
    audioManager.playToneEffect('pop');
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const reasonsList = birthdayConfig.reasonsILoveYou || [];

  return (
    <div className="reasons-section story-section">
      <motion.div
        className="reasons-header text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="section-badge">
          <Sparkles size={16} /> Just A Few Reasons
        </span>
        <h2 className="section-title text-shimmer romantic-font">
          Why You Are Loved So Deeply
        </h2>
        <p className="section-subtext">
          Tap each card to reveal one of the countless reasons why you mean everything to me.
        </p>
      </motion.div>

      {/* Grid of 3D Flip Cards */}
      <div className="reasons-grid">
        {reasonsList.map((item, index) => {
          const isFlipped = !!flippedCards[item.id || index];
          return (
            <motion.div
              key={item.id || index}
              className="flip-card-wrapper"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleCardFlip(item.id || index)}
            >
              <div className={`flip-card-inner ${isFlipped ? 'is-flipped' : ''}`}>
                {/* Front Side */}
                <div className="flip-card-front glass-card">
                  <div className="reason-number-badge">{item.number || `0${index + 1}`}</div>
                  <div className="reason-icon-wrapper">
                    {iconMap[item.icon] || <Heart size={24} color="var(--color-primary)" />}
                  </div>
                  <h3 className="reason-front-title">{item.title}</h3>
                  <div className="reveal-hint">
                    <Eye size={14} />
                    <span>Tap to reveal</span>
                  </div>
                </div>

                {/* Back Side */}
                <div className="flip-card-back glass-card">
                  <span className="reason-number-back">{item.number || `0${index + 1}`}</span>
                  <p className="reason-text-back">{item.text}</p>
                  <Heart size={18} fill="var(--color-primary)" color="var(--color-primary)" className="card-back-heart" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
