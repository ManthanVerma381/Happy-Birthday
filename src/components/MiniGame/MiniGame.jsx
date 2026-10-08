import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Trophy, RotateCcw, Play } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import { audioManager } from '../../utils/audioManager';
import './MiniGame.css';

export const MiniGame = () => {
  const TARGET_SCORE = birthdayConfig.miniGame?.targetScore || 15;
  const GAME_DURATION = 30; // Seconds

  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'won' | 'timeup'
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [fallingHearts, setFallingHearts] = useState([]);
  const gameAreaRef = useRef(null);

  // Timer countdown loop
  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setGameState('timeup');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  // Heart spawner loop
  useEffect(() => {
    let spawner;
    if (gameState === 'playing') {
      spawner = setInterval(() => {
        const id = Math.random().toString(36).substr(2, 9);
        const leftPercent = Math.random() * 85 + 5; // 5% to 90%
        const speed = Math.random() * 3 + 3; // 3s to 6s
        const size = Math.random() * 20 + 28; // 28px to 48px
        const color = ['#FF85A1', '#FF6584', '#FFD166', '#FBB1BD', '#E63946'][Math.floor(Math.random() * 5)];

        setFallingHearts((prev) => [
          ...prev,
          { id, left: leftPercent, speed, size, color }
        ]);
      }, 650);
    }
    return () => clearInterval(spawner);
  }, [gameState]);

  const startGame = () => {
    audioManager.playToneEffect('pop');
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setFallingHearts([]);
    setGameState('playing');
  };

  const catchHeart = (id, e) => {
    e.stopPropagation();
    audioManager.playToneEffect('pop');

    // Remove caught heart
    setFallingHearts((prev) => prev.filter((h) => h.id !== id));

    setScore((prevScore) => {
      const newScore = prevScore + 1;
      if (newScore >= TARGET_SCORE) {
        handleWin();
      }
      return newScore;
    });
  };

  const handleWin = () => {
    setGameState('won');
    audioManager.playToneEffect('celebration');

    // Victory Confetti
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FF85A1', '#FFD166', '#FFFFFF']
    });
  };

  return (
    <div className="mini-game-section story-section">
      <motion.div
        className="game-header text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="section-badge">
          <Sparkles size={16} /> Mini-Game
        </span>
        <h2 className="section-title text-shimmer romantic-font">
          Catch The Hearts ❤️
        </h2>
        <p className="section-subtext">
          Catch {TARGET_SCORE} falling hearts before time runs out to unlock your special reward!
        </p>
      </motion.div>

      {/* Main Interactive Game Container */}
      <div className="game-container glass-card" ref={gameAreaRef}>
        {/* Top Status Bar */}
        <div className="game-status-bar">
          <div className="status-pill">
            <Trophy size={18} color="var(--color-accent)" />
            <span>Score: <strong>{score}</strong> / {TARGET_SCORE}</span>
          </div>

          <div className="status-pill">
            <Sparkles size={18} color="var(--color-secondary)" />
            <span>Time: <strong>{timeLeft}s</strong></span>
          </div>
        </div>

        {/* Gameplay Area */}
        <div className="gameplay-viewport">
          {gameState === 'idle' && (
            <div className="game-overlay-screen">
              <Heart size={64} className="heart-pulse-icon" fill="var(--color-primary)" color="var(--color-primary)" />
              <h3>Ready to Play?</h3>
              <p>Tap falling hearts as fast as you can!</p>
              <button onClick={startGame} className="btn-primary start-game-btn">
                <Play size={20} fill="#ffffff" />
                <span>Start Game</span>
              </button>
            </div>
          )}

          {gameState === 'playing' && (
            <div className="falling-hearts-area">
              {fallingHearts.map((h) => (
                <motion.div
                  key={h.id}
                  className="falling-heart"
                  style={{
                    left: `${h.left}%`,
                    width: `${h.size}px`,
                    height: `${h.size}px`,
                    color: h.color
                  }}
                  initial={{ y: -60, opacity: 1 }}
                  animate={{ y: 380, opacity: 0.9 }}
                  transition={{ duration: h.speed, ease: "linear" }}
                  onClick={(e) => catchHeart(h.id, e)}
                  onTouchStart={(e) => catchHeart(h.id, e)}
                >
                  <Heart size={h.size} fill={h.color} color={h.color} />
                </motion.div>
              ))}
            </div>
          )}

          {gameState === 'won' && (
            <div className="game-overlay-screen victory-screen">
              <Trophy size={64} color="var(--color-accent)" />
              <h3 className="romantic-font victory-title">{birthdayConfig.miniGame.rewardTitle}</h3>
              <p className="reward-msg">{birthdayConfig.miniGame.rewardMessage}</p>

              <button onClick={startGame} className="btn-secondary play-again-btn">
                <RotateCcw size={18} />
                <span>Play Again</span>
              </button>
            </div>
          )}

          {gameState === 'timeup' && (
            <div className="game-overlay-screen">
              <h3>Time's Up!</h3>
              <p>You caught {score} hearts! So close!</p>
              <button onClick={startGame} className="btn-primary">
                <RotateCcw size={18} />
                <span>Try Again</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
