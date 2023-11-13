import {
  WebsocketProvider,
  socket,
} from "./context/websocket/WebSocketContext";

import { RouterProvider } from "react-router-dom";
import UserProvider from "./context/auth/authContext";
import { router } from "./config/router";

export default function App() {
  return (
    <div>
      <WebsocketProvider value={socket}>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </WebsocketProvider>
    </div>
  );
}
