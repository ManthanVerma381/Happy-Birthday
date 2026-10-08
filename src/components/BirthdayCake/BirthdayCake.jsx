import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Flame, Mic, MicOff, Sparkles, Heart } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import { audioManager } from '../../utils/audioManager';
import { MicDetector } from '../../utils/micDetector';
import './BirthdayCake.css';

export const BirthdayCake = ({ onCakeCompleted }) => {
  const TOTAL_CANDLES = 5;
  const [litCandles, setLitCandles] = useState([]);
  const [isWishPhase, setIsWishPhase] = useState(false);
  const [isBlownOut, setIsBlownOut] = useState(false);
  const [isListeningMic, setIsListeningMic] = useState(false);
  const [micStatusMsg, setMicStatusMsg] = useState('');
  const [micDetectorInstance, setMicDetectorInstance] = useState(null);

  // Toggle candle lit status on click
  const handleCandleClick = (index) => {
    if (isBlownOut) return;
    audioManager.playToneEffect('chime');

    setLitCandles((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        const updated = [...prev, index];
        if (updated.length === TOTAL_CANDLES) {
          setIsWishPhase(true);
        }
        return updated;
      }
    });
  };

  const lightAllCandles = () => {
    audioManager.playToneEffect('chime');
    setLitCandles([0, 1, 2, 3, 4]);
    setIsWishPhase(true);
  };

  // Blow out candles trigger
  const triggerExtinguish = () => {
    if (isBlownOut) return;
    setIsBlownOut(true);
    setIsWishPhase(false);

    if (micDetectorInstance) {
      micDetectorInstance.stop();
      setIsListeningMic(false);
    }

    // Sound effect
    audioManager.playToneEffect('blow');
    setTimeout(() => {
      audioManager.playToneEffect('celebration');
    }, 400);

    // Confetti explosion
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#FF85A1', '#FFD166']
    });
    fire(0.2, {
      spread: 60,
      colors: ['#FFF0F5', '#FF6584']
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ['#FFD166', '#FFFFFF']
    });
  };

  // Start Mic blow listener
  const handleMicBlowClick = async () => {
    if (isListeningMic) {
      if (micDetectorInstance) micDetectorInstance.stop();
      setIsListeningMic(false);
      setMicStatusMsg('');
      return;
    }

    setMicStatusMsg('Listening for your breath... Blow gently into your mic! 🌬️');

    const detector = new MicDetector(
      () => {
        setMicStatusMsg('Blow detected! Candles extinguished! ✨');
        triggerExtinguish();
      },
      (err) => {
        setMicStatusMsg('Microphone unavailable. Use tap fallback below!');
        setIsListeningMic(false);
      }
    );

    const success = await detector.startListening();
    if (success) {
      setIsListeningMic(true);
      setMicDetectorInstance(detector);
    } else {
      setIsListeningMic(false);
    }
  };

  useEffect(() => {
    return () => {
      if (micDetectorInstance) micDetectorInstance.stop();
    };
  }, [micDetectorInstance]);

  return (
    <div className="birthday-cake-section story-section">
      <motion.div
        className="cake-header text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="section-badge">
          <Sparkles size={16} /> Interactive Birthday Cake
        </span>
        <h2 className="section-title text-shimmer romantic-font">
          {isBlownOut
            ? `Wish Made for ${birthdayConfig.girlfriendName}! ❤️`
            : isWishPhase
            ? "Make a Wish... ✨"
            : "Light Your Birthday Candles 🕯️"}
        </h2>
        <p className="section-subtext">
          {isBlownOut
            ? "May every single dream in your heart come true this year."
            : isWishPhase
            ? "Blow gently into your microphone or tap the button to extinguish your candles!"
            : "Tap each candle flame to light up your cake!"}
        </p>
      </motion.div>

      {/* Cake Visual Container */}
      <div className="cake-visual-wrapper">
        {/* Candles Group */}
        <div className="candles-container">
          {Array.from({ length: TOTAL_CANDLES }).map((_, idx) => {
            const isLit = litCandles.includes(idx) && !isBlownOut;
            return (
              <div
                key={idx}
                className={`candle candle-${idx}`}
                onClick={() => handleCandleClick(idx)}
              >
                {/* Flame */}
                <div className={`flame-wrapper ${isLit ? 'lit' : ''}`}>
                  {isLit && (
                    <>
                      <div className="flame-core animate-flame" />
                      <div className="flame-glow" />
                    </>
                  )}
                  {isBlownOut && <div className="smoke-particle" />}
                </div>
                <div className="candle-stick" />
              </div>
            );
          })}
        </div>

        {/* 3D Glass Layered Birthday Cake */}
        <div className="cake-body">
          {/* Top Layer */}
          <div className="cake-layer layer-top">
            <div className="frosting-drips">
              <span /><span /><span /><span /><span />
            </div>
            <div className="strawberry-decor">🍓 🌸 🍓 🌸</div>
          </div>
          {/* Middle Layer */}
          <div className="cake-layer layer-middle">
            <div className="frosting-line" />
            <div className="cream-dots">
              <span /><span /><span /><span />
            </div>
          </div>
          {/* Bottom Layer */}
          <div className="cake-layer layer-bottom">
            <div className="frosting-line" />
            <div className="cake-decor-ribbon" />
          </div>
          {/* Cake Stand Base */}
          <div className="cake-stand" />
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="cake-controls">
        {!isWishPhase && !isBlownOut && (
          <button onClick={lightAllCandles} className="btn-secondary">
            <Flame size={18} color="#FFD166" />
            <span>Light All Candles ✨</span>
          </button>
        )}

        {isWishPhase && !isBlownOut && (
          <div className="wish-action-group">
            <button
              onClick={handleMicBlowClick}
              className={`btn-secondary ${isListeningMic ? 'mic-active' : ''}`}
            >
              {isListeningMic ? <MicOff size={18} /> : <Mic size={18} />}
              <span>{isListeningMic ? "Stop Listening" : "Blow via Mic 🎤"}</span>
            </button>

            <button onClick={triggerExtinguish} className="btn-primary animate-pulse-glow">
              <Sparkles size={18} />
              <span>Tap to Blow Out ✨</span>
            </button>
          </div>
        )}

        {micStatusMsg && <p className="mic-status-text">{micStatusMsg}</p>}

        {isBlownOut && (
          <motion.div
            className="celebration-card glass-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="celebration-msg romantic-font">
              Wish made. Happy {birthdayConfig.age}th Birthday, {birthdayConfig.girlfriendName}! ❤️
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
