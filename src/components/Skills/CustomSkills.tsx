import { useState } from "react";
import styles from "./card.module.css";

export const CustomSkills = () => {
  const [isActive, setIsActive] = useState(false);

  const clickHandler = () => {
    setIsActive(!isActive);
  };
  return (
    <div
      className={
        isActive ? `${styles.details} ${styles.fontStyle}` : styles.fontStyle
      }
    >
      <h2 style={{ textAlign: "center" }}>TECHNICAL SKILLS</h2>
      <div className={styles.card} onClick={clickHandler}>
        <div className={styles.photo}></div>
        <div className={styles.chart}>
          <div className={`${styles.bar} ${styles.bar1}`}>
            <span>ReactJS</span>
          </div>
          <div className={`${styles.bar} ${styles.bar2}`}>
            <span>JavaScript</span>
          </div>
          <div className={`${styles.bar} ${styles.bar3}`}>
            <span>jQuery</span>
          </div>
          <div className={`${styles.bar} ${styles.bar4}`}>
            <span>HTML5</span>
          </div>
          <div className={`${styles.bar} ${styles.bar5}`}>
            <span>CSS3</span>
          </div>
          <div className={`${styles.bar} ${styles.bar6}`}>
            <span>Firebase</span>
          </div>
          <div className={`${styles.bar} ${styles.bar7}`}>
            <span>MaterialUI</span>
          </div>
          <div className={`${styles.bar} ${styles.bar8}`}>
            <span>BootStrap</span>
          </div>
          <div className={`${styles.bar} ${styles.bar9}`}>
            <span>SCSS</span>
          </div>
          <div className={`${styles.bar} ${styles.bar10}`}>
            <span>NextJS</span>
          </div>
        </div>
      </div>
    </div>
  );
};
