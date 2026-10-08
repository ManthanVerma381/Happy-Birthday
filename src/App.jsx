import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParticleBackground } from './components/ParticleBackground/ParticleBackground';
import { AudioControls } from './components/AudioControls/AudioControls';
import { Navigation } from './components/Navigation/Navigation';
import { IntroScreen } from './components/IntroScreen/IntroScreen';
import { BirthdayMessage } from './components/BirthdayMessage/BirthdayMessage';
import { BirthdayCake } from './components/BirthdayCake/BirthdayCake';
import { Timeline } from './components/Timeline/Timeline';
import { PhotoGallery } from './components/PhotoGallery/PhotoGallery';
import { OpenWhen } from './components/OpenWhen/OpenWhen';
import { MiniGame } from './components/MiniGame/MiniGame';
import { LoveReasons } from './components/LoveReasons/LoveReasons';
import { FinalLetter } from './components/FinalLetter/FinalLetter';
import { SurpriseReveal } from './components/SurpriseReveal/SurpriseReveal';
import { Replay } from './components/Replay/Replay';
import { birthdayConfig } from './config/birthdayConfig';
import { audioManager } from './utils/audioManager';
import './styles/globals.css';

export function App() {
  // Experience phase: 'intro' | 'message' | 'main'
  const [phase, setPhase] = useState('intro');

  // Key for forcing complete state reset on Replay
  const [experienceKey, setExperienceKey] = useState(0);

  useEffect(() => {
    // Initialize central audio manager
    audioManager.init(
      birthdayConfig.music?.background || '/assets/music/birthday.mp3',
      birthdayConfig.music?.volume || 0.4
    );
  }, []);

  const handleOpenSurprise = () => {
    setPhase('message');
  };

  const handleMessageComplete = () => {
    setPhase('main');
  };

  const handleReplay = () => {
    setExperienceKey((prev) => prev + 1);
    setPhase('intro');
  };

  return (
    <div className="app-container" key={experienceKey}>
      {/* Ambient Interactive Particle Canvas */}
      <ParticleBackground />

      {/* Floating Audio Controls */}
      <AudioControls />

      {/* Floating Navigation Dots */}
      <Navigation currentPhase={phase} onSelectPhase={(p) => setPhase(p)} />

      {/* Main Experience Router */}
      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <IntroScreen onOpenSurprise={handleOpenSurprise} />
          </motion.div>
        )}

        {phase === 'message' && (
          <motion.div
            key="message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <BirthdayMessage onComplete={handleMessageComplete} />
          </motion.div>
        )}

        {phase === 'main' && (
          <motion.div
            key="main"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="main-story-flow"
          >
            {/* Interactive Birthday Cake */}
            <BirthdayCake />

            {/* Relationship Timeline */}
            <Timeline />

            {/* Photo Gallery & Lightbox */}
            <PhotoGallery />

            {/* Open When Envelopes */}
            <OpenWhen />

            {/* Catch The Hearts Mini-Game */}
            <MiniGame />

            {/* Reasons I Love You */}
            <LoveReasons />

            {/* Final Letter */}
            <FinalLetter />

            {/* Surprise Reveal */}
            <SurpriseReveal />

            {/* Replay Controller */}
            <Replay onReplayTrigger={handleReplay} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
