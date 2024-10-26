import React from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./FromBlockStyles.module.scss";
import { useAppDispatch } from "../../../redux/store";
import { setEmail } from "../../../redux/Slices/auth";
const FormBlock: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });
  console.log(isValid);
  const emailInput = watch("email");
  console.log(emailInput);
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email) || "Invalid email address";
  };
  const onSubmit = () => {
    if (isValid) {
      navigate("/Auth/registration");
      dispatch(setEmail(emailInput));
    }
  };
  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <input
          className={`${styles.mainInput} ${
            errors?.email?.message ? styles.errorInput : ""
          }`}
          placeholder="Email address"
          {...register("email", {
            required: "Please enter a valid email",
            validate: validateEmail,
          })}
        />
        <button type="submit" disabled={!isValid}>
          Get Started
        </button>
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
      </form>
    </div>
  );
};

export default FormBlock;
