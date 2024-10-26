export const UserInfo = () => {
  const data = localStorage.getItem("user");
  const name = data
    ? JSON.parse(data)
    : {
        name: "",
        email: "",
        password: "",
        avatar: "",
      };
  return name;
};
