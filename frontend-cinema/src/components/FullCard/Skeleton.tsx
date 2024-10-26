import React from "react";
import ContentLoader from "react-content-loader";
import styles from "./CardStyles.module.scss";
const Skeleton: React.FC = () => (
  <ContentLoader
    className={styles.skeleton}
    speed={1}
    width={235}
    height={300}
    viewBox="0 0 225 300"
    backgroundColor="grey"
    foregroundColor="#ecebeb"
  >
    <rect x="3" y="2" rx="0" ry="0" width="235" height="300" />
  </ContentLoader>
);

export default Skeleton;
