import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { handleImageError } from '../../utils/assetLoader';
import { audioManager } from '../../utils/audioManager';
import './Lightbox.css';

export const Lightbox = ({ photos, currentIndex, onClose, onNavigate }) => {
  const currentPhoto = photos[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const handlePrev = () => {
    audioManager.playToneEffect('pop');
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    onNavigate(prevIndex);
  };

  const handleNext = () => {
    audioManager.playToneEffect('pop');
    const nextIndex = (currentIndex + 1) % photos.length;
    onNavigate(nextIndex);
  };

  if (!currentPhoto) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="lightbox-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="lightbox-content-container" onClick={(e) => e.stopPropagation()}>
          {/* Close Button */}
          <button className="lightbox-close-btn" onClick={onClose} aria-label="Close Lightbox">
            <X size={24} />
          </button>

          {/* Navigation Controls */}
          {photos.length > 1 && (
            <>
              <button
                className="lightbox-nav-btn nav-prev"
                onClick={handlePrev}
                aria-label="Previous photo"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                className="lightbox-nav-btn nav-next"
                onClick={handleNext}
                aria-label="Next photo"
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}

          {/* Large Image Frame */}
          <motion.div
            key={currentIndex}
            className="lightbox-image-frame glass-card"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={currentPhoto.src}
              alt={currentPhoto.title || `Photo ${currentIndex + 1}`}
              className="lightbox-img"
              onError={(e) => handleImageError(e, currentPhoto.title || "Our Memory", currentPhoto.caption || "")}
            />

            <div className="lightbox-caption-box">
              <div className="caption-header">
                <h3 className="caption-title">{currentPhoto.title || `Memory #${currentIndex + 1}`}</h3>
                <span className="photo-counter">{currentIndex + 1} / {photos.length}</span>
              </div>
              <p className="caption-text">{currentPhoto.caption}</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
