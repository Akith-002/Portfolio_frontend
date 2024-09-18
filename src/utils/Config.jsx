// Config starter code
import { createChatBotMessage } from "react-chatbot-kit";
import { useState } from "react";
import BotAvatar from "../components/BotAvatar";

const config = {
  initialMessages: [
    createChatBotMessage(
      `Hi👋, I can answer questions about Akith Chandinu😎 and my portfolio❤️. Ask away!`
    ),
  ],
  customComponents: {
    header: () => (
      <div
        style={{
          background: "linear-gradient(90deg, #aaaaaa, #fafafa  )",
          padding: "0.6rem 1rem",
          borderRadius: "10px",
          boxShadow: "0 5px 10px rgba(0, 0, 0, 0.8)",
          textAlign: "center",
          color: "#000000",
          fontWeight: "bold",
        }}
      >
        Akith's AI Chatbot💻
      </div>
    ),
    botAvatar: (props) => <BotAvatar {...props} />,
  },
};

export default config;
