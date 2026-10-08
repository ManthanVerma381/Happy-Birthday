import React from 'react';
import { motion } from 'framer-motion';
import './Navigation.css';

export const Navigation = ({ currentPhase, onSelectPhase }) => {
  const chapters = [
    { id: 'intro', label: 'Intro' },
    { id: 'message', label: 'Note' },
    { id: 'main', label: 'Story Experience' }
  ];

  if (currentPhase === 'intro') return null;

  return (
    <motion.nav
      className="floating-chapter-nav"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="chapter-dots-glass">
        {chapters.map((ch) => (
          <button
            key={ch.id}
            onClick={() => onSelectPhase(ch.id)}
            className={`chapter-dot-btn ${currentPhase === ch.id ? 'active' : ''}`}
            title={ch.label}
            aria-label={ch.label}
          >
            <span className="dot-indicator" />
            <span className="dot-tooltip">{ch.label}</span>
          </button>
        ))}
      </div>
    </motion.nav>
  );
};
