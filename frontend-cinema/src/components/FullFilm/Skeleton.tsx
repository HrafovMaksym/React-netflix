import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton: React.FC = () => (
  <ContentLoader
    speed={1}
    width={1420}
    height={900}
    viewBox="0 0 1420 900"
    backgroundColor="grey"
    foregroundColor="#ecebeb"
  >
    <rect x="85" y="173" rx="0" ry="0" width="300" height="39" />
    <rect x="85" y="243" rx="0" ry="0" width="350" height="29" />
    <rect x="85" y="293" rx="0" ry="0" width="170" height="29" />
    <rect x="305" y="293" rx="0" ry="0" width="170" height="29" />
    <rect x="985" y="293" rx="0" ry="0" width="100" height="29" />
    <rect x="1105" y="293" rx="0" ry="0" width="100" height="29" />
    <rect x="1225" y="293" rx="0" ry="0" width="100" height="29" />
    <rect x="85" y="450" rx="0" ry="0" width="1240" height="50" />
    <rect x="85" y="565" rx="0" ry="0" width="1240" height="85" />
  </ContentLoader>
);

export default Skeleton;
