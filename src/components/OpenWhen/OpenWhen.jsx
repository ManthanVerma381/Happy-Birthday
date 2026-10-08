import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Heart,
  CloudRain,
  Smile,
  HeartHandshake,
  Compass,
  X,
  Mail,
  MailOpen
} from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import { audioManager } from '../../utils/audioManager';
import './OpenWhen.css';

export const OpenWhen = () => {
  const [activeEnvelope, setActiveEnvelope] = useState(null);

  const iconMap = {
    HeartHandshake: <HeartHandshake size={28} />,
    CloudRain: <CloudRain size={28} />,
    Smile: <Smile size={28} />,
    Sparkles: <Sparkles size={28} />,
    Compass: <Compass size={28} />,
    Heart: <Heart size={28} fill="var(--color-primary)" color="var(--color-primary)" />
  };

  const handleOpenEnvelope = (item) => {
    audioManager.playToneEffect('envelope');
    setActiveEnvelope(item);
  };

  const handleCloseEnvelope = () => {
    audioManager.playToneEffect('pop');
    setActiveEnvelope(null);
  };

  const envelopeList = birthdayConfig.openWhenMessages || [];

  return (
    <div className="open-when-section story-section">
      <motion.div
        className="open-when-header text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="section-badge">
          <Sparkles size={16} /> Open When...
        </span>
        <h2 className="section-title text-shimmer romantic-font">
          Letters For Any Moment
        </h2>
        <p className="section-subtext">
          A collection of small secrets and warm reminders created just for you. Open whenever you need them.
        </p>
      </motion.div>

      {/* Grid of Envelope Cards */}
      <div className="envelopes-grid">
        {envelopeList.map((item, index) => {
          return (
            <motion.div
              key={item.id || index}
              className="envelope-card glass-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => handleOpenEnvelope(item)}
            >
              <div className="envelope-icon-badge">
                {iconMap[item.icon] || <Mail size={28} />}
              </div>
              <h3 className="envelope-card-title">{item.title}</h3>
              <p className="envelope-card-subtitle">{item.subtitle}</p>

              <div className="envelope-action-tag">
                <Mail size={16} />
                <span>Tap to Open Letter</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Letter Reading Modal */}
      <AnimatePresence>
        {activeEnvelope && (
          <motion.div
            className="envelope-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseEnvelope}
          >
            <motion.div
              className="envelope-letter-card glass-card"
              initial={{ scale: 0.8, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 40 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="letter-close-btn"
                onClick={handleCloseEnvelope}
                aria-label="Close Letter"
              >
                <X size={20} />
              </button>

              <div className="letter-header">
                <div className="letter-icon-wrapper">
                  <MailOpen size={32} color="var(--color-primary)" />
                </div>
                <h3 className="letter-title romantic-font">{activeEnvelope.title}</h3>
              </div>

              <div className="letter-body">
                <p className="letter-text">{activeEnvelope.message}</p>
              </div>

              <div className="letter-footer">
                <span className="letter-signature romantic-font">
                  Always here for you, {birthdayConfig.myName} ❤️
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
