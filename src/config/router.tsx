// import GamePage from "../pages/game";
import { ChoiceGameMenu } from "../components/ChoiceGameMenu";
import GamePage from "../pages/game";
import HomePage from "../pages/index";
import { LobbyPage } from "../pages/lobby";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/game",
    element: <GamePage />,
  },
  {
    path: "/lobby",
    element: <LobbyPage />,
  },
  {
    path: "/game-select",
    element: <ChoiceGameMenu />,
  },
]);
