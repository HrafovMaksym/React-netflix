import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton: React.FC = () => (
  <ContentLoader
    speed={1}
    width={800}
    height={500}
    viewBox="0 0 800 500"
    backgroundColor="grey"
    foregroundColor="#ecebeb"
  >
    <rect x="3" y="2" rx="0" ry="0" width="800" height="500" />
  </ContentLoader>
);

export default Skeleton;
