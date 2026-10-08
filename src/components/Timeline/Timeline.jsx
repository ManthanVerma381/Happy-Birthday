import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Heart } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import { handleImageError } from '../../utils/assetLoader';
import './Timeline.css';

export const Timeline = () => {
  const timelineData = birthdayConfig.timeline && birthdayConfig.timeline.length > 0
    ? birthdayConfig.timeline
    : [
        {
          id: 1,
          title: "The First Chapter",
          date: "Beginning of Us",
          description: birthdayConfig.story,
          image: "/assets/photos/photo1.jpg",
          caption: "Where our journey began ✨"
        }
      ];

  return (
    <div className="timeline-section story-section">
      <motion.div
        className="timeline-header text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="section-badge">
          <Sparkles size={16} /> Our Story & Milestones
        </span>
        <h2 className="section-title text-shimmer romantic-font">
          Every Moment With You
        </h2>
        <p className="section-subtext">
          A timeline of our favorite chapters, unforgettable smiles, and cherished memories.
        </p>
      </motion.div>

      {/* Main Vertical Timeline Container */}
      <div className="timeline-container">
        {/* Animated Central Spine Line */}
        <div className="timeline-spine-line" />

        {timelineData.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={item.id || index}
              className={`timeline-item ${isEven ? 'item-left' : 'item-right'}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
            >
              {/* Glowing Node Marker */}
              <div className="timeline-marker">
                <Heart size={14} fill="var(--color-primary)" color="var(--color-primary)" />
              </div>

              {/* Glass Content Card */}
              <div className="timeline-card glass-card">
                <div className="card-header-date">
                  <Calendar size={14} className="date-icon" />
                  <span>{item.date}</span>
                </div>
                <h3 className="card-title">{item.title}</h3>
                <p className="card-description">{item.description}</p>

                {item.image && (
                  <div className="card-image-wrapper">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="card-image"
                      onError={(e) => handleImageError(e, item.title, item.caption || "Our Memory")}
                      loading="lazy"
                    />
                    {item.caption && <span className="card-image-caption">{item.caption}</span>}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
