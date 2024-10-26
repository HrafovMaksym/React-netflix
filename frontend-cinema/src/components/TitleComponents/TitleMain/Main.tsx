import React from "react";

import tvImg from "../../../assets/images/image_2022-07-14_141534683.png";
import mobileImg from "../../../assets/images/mobile-0819.jpg";
import divices from "../../../assets/images/diferent devices.png";
import forKids from "../../../assets/images/AAAABejKYujIIDQciqmGJJ8BtXkYKKTi5jiqexltvN1YmvXYIfX8B9CYwooUSIzOKneblRFthZAFsYLMgKMyNfeHwk16DmEkpIIcb6A3.png";

import styles from "./MainStyles.module.scss";
import AskedBtns from "./AskedBtns";
import FormBlock from "../FormBlock/FormBlock";

const Main: React.FC = () => {
  const sectionsData = [
    {
      title: "Enjoy on your TV",
      text: "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
      imgSrc: tvImg,
      imgFirst: false,
    },
    {
      title: "Download your shows to watch offline",
      text: "Save your favorites easily and always have something to watch.",
      imgSrc: mobileImg,
      imgFirst: true,
    },
    {
      title: "Watch everywhere",
      text: "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.",
      imgSrc: divices,
      imgFirst: false,
    },
    {
      title: "Create profiles for kids",
      text: "Send kids on adventures with their favorite characters in a space made just for them—free with your membership.",
      imgSrc: forKids,
      imgFirst: true,
    },
  ];

  return (
    <div className={styles.root}>
      {sectionsData.map((el, id) => (
        <section key={id} className={styles.Section}>
          <div className="titleContainer">
            <div className={styles.sectionInner}>
              {el.imgFirst ? (
                <>
                  <img src={el.imgSrc} alt="" />
                  <div className={styles.text}>
                    <h1>{el.title}</h1>
                    <p>{el.text}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.text}>
                    <h1>{el.title}</h1>
                    <p>{el.text}</p>
                  </div>
                  <img src={el.imgSrc} alt="" />
                </>
              )}
            </div>
          </div>
        </section>
      ))}
      <section className={styles.questions}>
        <div className="titleContainer">
          <h1>Frequently Asked Questions</h1>
          <AskedBtns />
          <p>
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          <FormBlock />
        </div>
      </section>
    </div>
  );
};

export default Main;
