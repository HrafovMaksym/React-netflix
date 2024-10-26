import React from "react";
import styles from "./BtnsStyles.module.scss";

const AskedBtns: React.FC = () => {
  const faqData = [
    {
      question: "What is Netflix?",
      answer:
        "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices. You can watch as much as you want, whenever you want, without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!",
    },
    {
      question: "How much does Netflix cost?",
      answer:
        "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from EUR 7.99 to EUR 11.99 a month. No extra costs, no contracts.",
    },
    {
      question: "Where can I watch?",
      answer:
        "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.You can also download your favorite shows with the iOS or Android app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.",
    },
    {
      question: "How do I cancel?",
      answer:
        "Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.",
    },
    {
      question: "What can I watch on Netflix?",
      answer:
        "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.",
    },
    {
      question: "What can I watch on Netflix?",
      answer:
        "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space.Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.",
    },
  ];

  const [active, setActive] = React.useState<number | null>(null);

  const onClickBtn = (id: number) => {
    setActive(active === id ? null : id);
  };
  return (
    <div>
      {faqData.map((el, id) => (
        <div
          className={`${styles.root} ${active === id ? styles.open : ""}`}
          key={id}
        >
          <button onClick={() => onClickBtn(id)} className={styles.btnQuestion}>
            {el.question}

            <svg
              className={`${styles.imageClose} ${
                active === id ? styles.toggled : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              width="36"
              height="36"
              viewBox="0 0 36 36"
              role="img"
              data-icon="PlusLarge"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17 17V3H19V17H33V19H19V33H17V19H3V17H17Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
          {active === id && (
            <div className={styles.textCard}>
              <p>{el.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AskedBtns;
