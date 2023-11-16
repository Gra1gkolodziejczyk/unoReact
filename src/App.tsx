import { RouterProvider } from "react-router-dom";
import UserProvider from "./context/auth/authContext";
import WebSocketsProvider from "./context/websocket/WebSocketContext";
import { router } from "./config/router";

export default function App() {
  return (
    <div>
      <WebSocketsProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </WebSocketsProvider>
    </div>
  );
}
