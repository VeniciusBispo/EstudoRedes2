import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FlashcardProps {
  front: string;
  back: string;
}

const Flashcard: React.FC<FlashcardProps> = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="flashcard-container" 
      style={{ 
        perspective: '1000px', 
        width: '100%', 
        height: '250px', 
        cursor: 'pointer' 
      }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--glass-border)',
          borderRadius: '16px',
          textAlign: 'center',
          fontSize: '1.2rem',
          fontWeight: 600
        }}>
          {front}
        </div>

        {/* Back */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-tertiary))',
          borderRadius: '16px',
          textAlign: 'center',
          fontSize: '1.1rem',
          color: 'white',
          transform: 'rotateY(180deg)'
        }}>
          {back}
        </div>
      </motion.div>
    </div>
  );
};

export default Flashcard;
