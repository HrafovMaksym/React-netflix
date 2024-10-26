import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./BurgerStyles.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
interface navBurgerProps {
  navLinks: { title: string; url: string }[];
}
const NavBurger: React.FC<navBurgerProps> = ({ navLinks }) => {
  const [isActive, setIsActive] = React.useState(false);
  const [isProfile, setIsProfile] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const menuBtnRef = React.useRef<HTMLSpanElement>(null);
  const onClickActive = () => {
    setIsActive(!isActive);
  };
  React.useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        menuBtnRef.current &&
        !menuBtnRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    };

    if (isActive) {
      document.body.style.overflow = "hidden";
      document.body.addEventListener("click", onClickOutside);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.removeEventListener("click", onClickOutside);
    };
  }, [isActive]);

  return (
    <div className={styles.root}>
      <span ref={menuBtnRef}>
        <MenuIcon className={styles.menuButton} onClick={onClickActive} />
      </span>

      <div className={`${styles.overlay} ${isActive ? styles.active : ""}`}>
        {isActive && (
          <div ref={menuRef} className={styles.menu}>
            <span className={styles.topMenu}>
              <span className={styles.title}>
                <h3 className={styles.profileName}>Maxim</h3> <LogoutIcon />
              </span>

              <CloseIcon className={styles.btnClose} onClick={onClickActive} />
            </span>
            <ul className={styles.links}>
              {navLinks.map((obj, id) => (
                <NavLink
                  className={({ isActive }) => (isActive ? styles.active : "")}
                  key={id}
                  to={obj.url}
                >
                  {obj.title}
                </NavLink>
              ))}
            </ul>
            <div className={styles.menuBottom}>
              <span
                onClick={() => setIsProfile(!isProfile)}
                className={styles.topProfile}
              >
                <h3>Profile Settings</h3>{" "}
                {isProfile ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </span>
              <ul
                className={`${styles.profile} ${
                  isProfile ? styles.active : ""
                }`}
              >
                <Link to={"/Home/Profile/Edit"}>Edit</Link>
                <Link to={"/auth/edit"}>List</Link>
                <Link to={"/auth/edit"}>Subscribes</Link>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBurger;
