import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton: React.FC = () => (
  <ContentLoader
    speed={1}
    width={300}
    height={150}
    viewBox="0 0 300 150"
    backgroundColor="grey"
    foregroundColor="#ecebeb"
  >
    <rect x="3" y="2" rx="0" ry="0" width="300" height="150" />
  </ContentLoader>
);

export default Skeleton;
