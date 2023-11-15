import { RouterProvider } from "react-router-dom";
import UserProvider from "./context/auth/authContext";
import { router } from "./config/router";

export default function App() {
  return (
    <div>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
    </div>
  );
}
