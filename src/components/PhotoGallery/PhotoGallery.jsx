import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Maximize2, Heart } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import { handleImageError } from '../../utils/assetLoader';
import { Lightbox } from '../Lightbox/Lightbox';
import './PhotoGallery.css';

export const PhotoGallery = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  const photosList = birthdayConfig.photos && birthdayConfig.photos.length > 0
    ? birthdayConfig.photos
    : Array.from({ length: 6 }).map((_, idx) => ({
        src: `/assets/photos/photo${idx + 1}.jpg`,
        title: `Memory #${idx + 1}`,
        caption: "Our beautiful moment together ✨",
        date: "Special Day"
      }));

  const openLightbox = (index) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  return (
    <div className="gallery-section story-section">
      <motion.div
        className="gallery-header text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="section-badge">
          <Sparkles size={16} /> Photo Gallery
        </span>
        <h2 className="section-title text-shimmer romantic-font">
          Snapshots of Happiness
        </h2>
        <p className="section-subtext">
          A collection of smiles, cozy moments, and favorite memories with {birthdayConfig.girlfriendName}.
        </p>
      </motion.div>

      {/* Masonry / Grid Gallery */}
      <div className="photo-grid">
        {photosList.map((photo, index) => {
          // Varied aspect ratio sizes for masonry visual appeal
          const heightClasses = ['tall', 'medium', 'short'];
          const sizeClass = heightClasses[index % heightClasses.length];

          return (
            <motion.div
              key={index}
              className={`photo-card glass-card card-${sizeClass}`}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => openLightbox(index)}
              whileHover={{ y: -6 }}
            >
              <div className="photo-image-container">
                <img
                  src={photo.src}
                  alt={photo.title || `Photo ${index + 1}`}
                  className="photo-img"
                  onError={(e) => handleImageError(e, photo.title || `Memory #${index + 1}`, photo.caption || "Our Memory")}
                  loading="lazy"
                />
                <div className="photo-overlay">
                  <div className="overlay-content">
                    <Maximize2 size={24} className="expand-icon" />
                    <h4 className="photo-title">{photo.title || `Memory #${index + 1}`}</h4>
                    <p className="photo-caption">{photo.caption}</p>
                  </div>
                </div>
              </div>
              <div className="photo-footer-bar">
                <span className="photo-date">{photo.date || "Forever Memory"}</span>
                <Heart size={14} className="photo-heart-icon" fill="var(--color-secondary)" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <Lightbox
          photos={photosList}
          currentIndex={selectedPhotoIndex}
          onClose={closeLightbox}
          onNavigate={(newIndex) => setSelectedPhotoIndex(newIndex)}
        />
      )}
    </div>
  );
};
