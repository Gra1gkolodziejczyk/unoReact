import { Link, useNavigate } from "react-router-dom";
import { login, saveToken } from "../../services/accountService";

import { Menu } from "../../components/menu";
import React from "react";
import { UserContext } from "../../context/auth/authContext";
import { useContext } from "react";

const LoginPage = () => {
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    setCredentials({
      ...credentials,
      [event.currentTarget.name]: value,
    });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
      login(credentials)
      .then((res) => {
        saveToken(res.data.access_token);
        setUser({
          id: res.data.id,
          username: res.data.username,
          email: res.data.email,
        });
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Menu
      children={
        <form onSubmit={onSubmit}>
          <div className="w-full">
            <div className="w-full p-6 space-y-6 md:space-y-6 sm:p-8">
              <h1 className="font-font italic bold uppercase text-orange text-center text-xl font-bold leading-tight tracking-tight md:text-2xl">
                Connexion
              </h1>

              <div className="block mb-2 text-sm">
                <label className="pl-1 font-font" htmlFor="email">Email </label>
                <br></br>
                <input
                  className="font-font placeholder:italic placeholder:text-slate-400 bg-grey w-full rounded-2xl leading-7 pl-1"
                  type="text"
                  placeholder="Identifiant..."
                  name="email"
                  value={credentials.email}
                  onChange={onChange}
                />
              </div>
              <div className="block mb-2 text-sm">
                <label className="pl-1 font-font" htmlFor="password">Mot de passe </label>
                <br></br>
                <input
                  className="font-font placeholder:italic placeholder:text-slate-400 bg-grey w-full rounded-2xl leading-7 pl-1"
                  type="text"
                  placeholder="Mot de passe..."
                  name="password"
                  value={credentials.password}
                  onChange={onChange}
                />
              </div>
              <div className="grblock mb-2 text-sm text-center">
                <button className="font-font w-[200px] h-[50px] bg-orange text-xl m-5 cursor-pointer text-white rounded-3xl hover:bg-gradient-to-r">
                  Se connecter
                </button>
              </div>
              <div className="grblock mb-2 text-sm text-center">
                <button className="text-orange font-font text-center p-2">
                  <Link to={"/register"}>Je n'ai pas de compte</Link>
                </button>
              </div>
            </div>
          </div>
        </form>
      }
    />
  );
};

export default LoginPage;
