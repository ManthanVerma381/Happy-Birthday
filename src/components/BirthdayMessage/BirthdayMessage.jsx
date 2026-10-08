import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import { audioManager } from '../../utils/audioManager';
import './BirthdayMessage.css';

export const BirthdayMessage = ({ onComplete }) => {
  const lines = [
    `Hey, ${birthdayConfig.girlfriendName}...`,
    "I wanted to make something a little different for you.",
    "Because one simple birthday message didn't feel like enough for someone as special as you.",
    `Happy Birthday, ${birthdayConfig.girlfriendName} ❤️`
  ];

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setIsFinished(true);
      setIsTyping(false);
      return;
    }

    const fullText = lines[currentLineIndex];
    let charIndex = 0;
    setDisplayedText('');
    setIsTyping(true);

    const interval = setInterval(() => {
      if (charIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(interval);
        setIsTyping(false);

        // Pause before typing next line
        setTimeout(() => {
          if (currentLineIndex < lines.length - 1) {
            setCurrentLineIndex((prev) => prev + 1);
          } else {
            setIsFinished(true);
          }
        }, 1600);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [currentLineIndex]);

  const handleSkipOrContinue = () => {
    audioManager.playToneEffect('pop');
    if (!isFinished) {
      // Immediately show all lines and enable finish state
      setDisplayedText(lines[lines.length - 1]);
      setIsFinished(true);
      setIsTyping(false);
    } else {
      if (onComplete) onComplete();
    }
  };

  return (
    <div className="birthday-message-container">
      <motion.div
        className="message-card glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="message-badge">
          <Sparkles size={16} className="badge-icon" />
          <span>A Note For You</span>
        </div>

        <div className="typewriter-area">
          <p className="typed-text romantic-font">
            {displayedText}
            {isTyping && <span className="blinking-cursor">|</span>}
          </p>
        </div>

        <div className="message-actions">
          <button
            onClick={handleSkipOrContinue}
            className="btn-primary continue-btn"
          >
            <span>{isFinished ? "Explore Cake & Memories" : "Skip Animation"}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
