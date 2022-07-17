import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <p>© 2022. 집밥꼬꼬선생 All right reserved.</p>
      <a
        target="_blank"
        href="https://github.com/jihohub/Refactoring-HomeCookingMaster"
        className={styles.link}
      >
        GitHub
      </a>
    </div>
  );
};

export default Footer;
