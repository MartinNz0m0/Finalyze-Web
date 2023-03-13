import React from 'react';

const ProgressBar = ({ percent, color }) => {
  return (
    <div className="progress bg-secondary bg-opacity-25" style={{height: 10}}>
      <div className={`${color}`} role="progressbar" style={{width: (percent)}} aria-valuemin="10" aria-valuemax="100"></div>
    </div>
  );
};

export default ProgressBar;
