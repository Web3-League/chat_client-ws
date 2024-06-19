import React from 'react';
import './styles/ReactionCard.css';

const ReactionCard = ({ reactions }) => {
  const reactionCounts = reactions.reduce((acc, reaction) => {
    if (acc[reaction.emoji]) {
      acc[reaction.emoji]++;
    } else {
      acc[reaction.emoji] = 1;
    }
    return acc;
  }, {});

  return (
    <div className="reaction-card">
      {Object.entries(reactionCounts)
        .filter(([emoji, count]) => count > 0)
        .map(([emoji, count], index) => (
          <div key={index} className="reaction-item">
            <span className="reaction-emoji">{emoji}</span>
            <span className="reaction-count">+{count}</span>
          </div>
        ))}
    </div>
  );
};

export default ReactionCard;
