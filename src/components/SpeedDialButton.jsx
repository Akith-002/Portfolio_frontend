import React, { useState } from "react";
import Chatbot from "react-chatbot-kit";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import "react-chatbot-kit/build/main.css";
import "./bot.css";

import config from "../utils/Config.jsx";
import actionProvider from "../utils/ActionProvider.js";
import messageParser from "../utils/MessageParser.js";

const SpeedDialButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end z-20">
      {/* Chat Window */}
      {isChatOpen && (
        <Chatbot
          config={config}
          messageParser={messageParser}
          actionProvider={actionProvider}
          placeholderText="What do you want to know?"
        />
      )}

      {/* Speed Dial Button */}
      <button
        onClick={toggleChat}
        className="bg-black text-yellow-500 border-2 border-yellow-300 p-4 rounded-full shadow-lg hover:bg-yellow-400 hover:text-black transition-all"
      >
        <ChatBubbleLeftEllipsisIcon className="h-8 w-8" />
      </button>
    </div>
  );
};

export default SpeedDialButton;
