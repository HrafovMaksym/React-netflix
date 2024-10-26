import React from "react";
import styles from "./FooterStyles.module.scss";
import { Link } from "react-router-dom";
import LangPopUp from "../TitleComponents/LangPopUp/LangPopUp";
const Footer: React.FC = () => {
  const links = [
    "FAQ",
    "Investor Relations",
    "Privacy",
    "Speed Test",
    "Ad Choices",
    "Help Center",
    "Jobs",
    "Cookie Preferences",
    "Legal Guarantee",
    "Account",
    "Ways to Watch",
    "Corporate Information",
    "Legal Notices",
    "Media Center",
    "Terms of Use",
    "Contact Us",
    "Only on Netflix",
  ];
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerInner}>
          <Link className={styles.questions} to={"#"}>
            Questions? Contact us.
          </Link>
          <div className={styles.gridLinks}>
            {links.map((el: string, id: number) => (
              <Link key={id} to={"#"}>
                {el}
              </Link>
            ))}
          </div>
          <LangPopUp />
          <p>Netflix Austria</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
