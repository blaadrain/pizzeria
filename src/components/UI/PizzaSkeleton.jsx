import React from 'react';
import ContentLoader from 'react-content-loader';

const PizzaSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={490}
    viewBox="0 0 280 490"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle
      cx="140"
      cy="125"
      r="120"
    />
    <rect
      x="0"
      y="272"
      rx="10"
      ry="10"
      width="280"
      height="47"
    />
    <rect
      x="0"
      y="340"
      rx="10"
      ry="10"
      width="280"
      height="82"
    />
    <rect
      x="0"
      y="440"
      rx="10"
      ry="10"
      width="280"
      height="44"
    />
  </ContentLoader>
);

export default PizzaSkeleton;
