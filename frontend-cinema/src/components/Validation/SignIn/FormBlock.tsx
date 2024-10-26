import React from "react";
import styles from "../../../scss/modules/loginStyles.module.scss";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../redux/store";
import { fetchData, fetchLogin } from "../../../redux/Slices/auth";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useSelector } from "react-redux";

const FormBlock: React.FC = () => {
  const dispatch = useAppDispatch();
  const [visiblePassword, setVisiblePassword] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const isAuth = useSelector(fetchData);

  const {
    register,
    handleSubmit,
    setFocus,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    const res = await dispatch(fetchLogin(data));
    if (!res.payload) {
      setError("root.serverError", {
        type: "404",
      });
    }
    if (checked && "token" in res.payload) {
      window.localStorage.setItem("token", res.payload.token);
    }
  };
  const onChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };
  const onClickVisible = () => {
    setVisiblePassword(!visiblePassword);
    setFocus("password");
  };
  const getErrorCount = () => {
    let count = 0;
    if (errors.email?.message) count++;
    if (errors.password?.message) count++;
    if (errors.root?.serverError?.type === "404") count += 5;
    return count;
  };
  const errorCount = getErrorCount();
  const blockHeight = 450 + errorCount * 20;
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email) || "Invalid email address";
  };
  if (isAuth) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className={styles.signForm}>
      <div
        className={styles.block}
        style={errorCount ? { height: `${blockHeight}px` } : { height: 430 }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.formBlock}
          action="sign"
        >
          <h1>Sign in</h1>

          {errors.root?.serverError.type === "404" && (
            <div className={styles.rootError}>
              <h3>Incorrect password or email</h3>
              <p>
                You can use a <Link to={"#"}> reset your password</Link> or try
                again.
              </p>
            </div>
          )}
          <input
            className={`${styles.mainInput} ${
              errors?.email?.message || errors.root?.serverError.type
                ? styles.errorInput
                : ""
            }`}
            placeholder="Email"
            {...register("email", {
              required: "Please enter a valid email",
              validate: validateEmail,
            })}
          />

          {errors?.email?.message && (
            <p className={styles.error}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                role="img"
                data-icon="CircleXSmall"
                aria-hidden="true"
                className="default-ltr-cache-0 e1vkmu651"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM4.46967 5.53033L6.93934 8L4.46967 10.4697L5.53033 11.5303L8 9.06066L10.4697 11.5303L11.5303 10.4697L9.06066 8L11.5303 5.53033L10.4697 4.46967L8 6.93934L5.53033 4.46967L4.46967 5.53033Z"
                  fill="currentColor"
                ></path>
              </svg>
              {errors?.email?.message}
            </p>
          )}
          <div className={styles.passWrapper}>
            <input
              className={`${styles.passwordInput} ${
                errors?.password?.message || errors.root?.serverError.type
                  ? styles.errorInput
                  : ""
              }`}
              placeholder="Password"
              type={visiblePassword ? "text" : "password"}
              {...register("password", {
                required: "Please enter a password",
                minLength: {
                  value: 4,
                  message:
                    "Your password must contain between 4 and 60 characters",
                },
                maxLength: {
                  value: 60,
                  message:
                    "Your password must contain between 4 and 60 characters",
                },
              })}
            />

            <span className={styles.visibleBtn} onClick={onClickVisible}>
              {visiblePassword ? (
                <VisibilityIcon className={styles.visibleIcon} />
              ) : (
                <VisibilityOffIcon className={styles.visibleIcon} />
              )}
            </span>
          </div>

          {errors?.password?.message && (
            <p className={styles.error}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                role="img"
                data-icon="CircleXSmall"
                aria-hidden="true"
                className="default-ltr-cache-0 e1vkmu651"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM4.46967 5.53033L6.93934 8L4.46967 10.4697L5.53033 11.5303L8 9.06066L10.4697 11.5303L11.5303 10.4697L9.06066 8L11.5303 5.53033L10.4697 4.46967L8 6.93934L5.53033 4.46967L4.46967 5.53033Z"
                  fill="currentColor"
                ></path>
              </svg>
              {errors?.password?.message}
            </p>
          )}

          <button type="submit" className={styles.sign}>
            Sign In
          </button>

          <p>
            <Link to={"#"}>Forgot Password?</Link>
          </p>

          <label className={styles.checkBox}>
            <input type="checkbox" checked={checked} onChange={onChangeCheck} />
            <span className={styles.checkMark}></span>
            Remember me
          </label>

          <div>
            <span>New On Netflix?</span>
            <Link to={"/Auth/Registration"}> Sign up now.</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormBlock;
