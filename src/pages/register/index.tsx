import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";

import { Menu } from "../../components/menu";
import { UserContext } from "../../context/auth/authContext";
import { register } from "../../services/accountService";

const RegisterPage = () => {
  useContext(UserContext);
  const navigate = useNavigate();

  const [credentials, setCredentials] = React.useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [error, setError] = React.useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    setCredentials({
      ...credentials,
      [event.currentTarget.name]: value,
    });
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (credentials.password !== credentials.passwordConfirm) {
      setError("Les mots de passe ne correspondent pas");
      console.log(error);
      return;
    }
    register({
      username: credentials.username,
      email: credentials.email,
      password: credentials.password,
      passwordConfirm: credentials.passwordConfirm,
    })
      .then(() => {
        console.log(
          credentials.username,
          credentials.email,
          credentials.password,
          credentials.passwordConfirm
        );
        navigate("/login");
      })
      .catch(() => console.log("ok euuuh .. error mek è_é"));
  };
  return (
    <Menu
      children={
        <form onSubmit={onSubmit}>
          <div className="w-full">
            <div className="w-full p-6 space-y-6 md:space-y-6 sm:p-8">
              <h1 className="font-font italic bold uppercase text-orange text-center text-xl font-bold leading-tight tracking-tight md:text-2xl">
                S&apos;inscrire
              </h1>

              <div className="block mb-2 text-sm">
                <label className="pl-1 font-font">Username</label>
                <br></br>
                <input
                  className="font-font placeholder:italic placeholder:text-slate-400 bg-grey w-full rounded-2xl leading-7 pl-1"
                  type="text"
                  placeholder="Pseudo..."
                  value={credentials.email}
                  onChange={onChange}
                />
              </div>
              <div className="block mb-2 text-sm">
                <label className="pl-1 font-font">Email</label>
                <br></br>
                <input
                  className="font-font placeholder:italic placeholder:text-slate-400 bg-grey w-full rounded-2xl leading-7 pl-1"
                  type="text"
                  placeholder="Adresse email..."
                  value={credentials.email}
                  onChange={onChange}
                />
              </div>
              <div className="block mb-2 text-sm">
                <label className="pl-1 font-font">Mot de passe </label>
                <br></br>
                <input
                  className="font-font placeholder:italic placeholder:text-slate-400 bg-grey w-full rounded-2xl leading-7 pl-1"
                  type="password"
                  placeholder="Mot de passe..."
                  value={credentials.password}
                  onChange={onChange}
                />
              </div>
              <div className="block mb-2 text-sm">
                <label className="pl-1 font-font">
                  Confirmation du mot de passe
                </label>
                <br></br>
                <input
                  className="font-font placeholder:italic placeholder:text-slate-400 bg-grey w-full rounded-2xl leading-7 pl-1"
                  type="password"
                  placeholder="Confirmation du mot de passe..."
                  value={credentials.passwordConfirm}
                  onChange={onChange}
                />
              </div>
              <div className="grblock mb-2 text-sm text-center">
                <button className="font-font w-[200px] h-[50px] bg-orange text-xl m-5 cursor-pointer text-white rounded-3xl hover:bg-gradient-to-r">
                  Créer un compte
                </button>
              </div>
              <div className="grblock mb-2 text-sm text-center">
                <button className="text-orange font-font text-center p-2">
                  <Link to={"/login"}>J'ai déjà un compte ?</Link>
                </button>
              </div>
            </div>
          </div>
        </form>
      }
    />
  );
};

export default RegisterPage;
