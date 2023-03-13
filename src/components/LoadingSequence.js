import React, { useState, useEffect } from 'react';

const  LoadingSequence = () => {
  const [loadingText, setLoadingText] = useState('Unlocking PDF');
  
  useEffect(() => {
    const timer1 = setTimeout(() => setLoadingText('PDF password ok ✅'), 800);
    const timer4 = setTimeout(() => setLoadingText('Starting conversion engine...'), 1500);
    const timer2 = setTimeout(() => setLoadingText('Generating CSV...'), 3000);
    const timer5 = setTimeout(() => setLoadingText('Cleaning up CSV data errors...'), 4000);
    const timer3 = setTimeout(() => setLoadingText('Compiling data...'), 5500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer4);
      clearTimeout(timer2);
      clearTimeout(timer5);
      clearTimeout(timer3);
    };
  }, []);
  
  return (
    <div className='d-flex flex-row text-center'>
      <h5 className='mtii text-info m-1'>{loadingText}</h5>
      <div className="mtii spinner-grow spinner-grow-sm text-info m-1 mt-2" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default LoadingSequence;
