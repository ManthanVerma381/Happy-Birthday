import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import './FinalLetter.css';

export const FinalLetter = () => {
  const letterText = birthdayConfig.finalLetter || `Dearest ${birthdayConfig.girlfriendName},

Happy Birthday!

Every single day with you is a gift I hold close to my heart. Thank you for your warmth, your laughter, and your boundless love.

With all my love,
${birthdayConfig.myName} ❤️`;

  return (
    <div className="final-letter-section story-section">
      <motion.div
        className="letter-intro-tag text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="section-badge">
          <Sparkles size={16} /> From My Heart To Yours
        </span>
        <h2 className="section-title text-shimmer romantic-font">
          One Last Thing...
        </h2>
      </motion.div>

      {/* Parchment/Letter Container */}
      <motion.div
        className="final-letter-card glass-card"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="letter-corner-accent top-left">🌸</div>
        <div className="letter-corner-accent top-right">🌸</div>

        <div className="letter-content-body">
          <pre className="letter-pre-formatted romantic-font">{letterText}</pre>
        </div>

        <div className="letter-footer-seal">
          <Heart size={24} fill="var(--color-primary)" color="var(--color-primary)" />
        </div>
      </motion.div>
    </div>
  );
};
