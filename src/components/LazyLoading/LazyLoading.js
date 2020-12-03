/* eslint-disable react/prop-types */
import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';

const LazyLoading = ({ onScroll, children }) => {
  const handleScrollToEnd = (isVisible) => {
    if (isVisible) {
      onScroll();
    }
  };
  return (
    <>
      {children}
      <VisibilitySensor onChange={handleScrollToEnd}>
        <div style={{ width: '10px', height: '10px' }}> </div>
      </VisibilitySensor>
    </>
  );
};

export default LazyLoading;
