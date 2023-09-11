import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ChatPage from "./components/ChatPage";
import io from "socket.io-client";
import { UserNameProvider } from "./components/UserNameContext";

function App() {
  const socket = io("http://localhost:4000");
  console.log(`Socket.io connected: ${socket.connected}`);

  return (
    <BrowserRouter>
      <UserNameProvider>
        <div>
          <Routes>
            <Route path="/" element={<Home socket={socket} />}></Route>
            <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
          </Routes>
        </div>
      </UserNameProvider>
    </BrowserRouter>
  );
}

export default App;
