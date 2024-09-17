// Config starter code
import { createChatBotMessage } from "react-chatbot-kit";
import { useState } from "react";

const config = {
  initialMessages: [
    createChatBotMessage(
      `Hi👋, I can answer questions about Akith Chandinu😎 and my portfolio❤️. Ask away!`
    ),
  ],
  customStyles: {
    botMessageBox: {
      // dark gray
      backgroundColor: "#4B5563",
    },
    chatButton: {
      // yellow
      backgroundColor: "#FFD700",
    },
  },
  customComponents: {
    header: () => (
      <div
        style={{ backgroundColor: "red", padding: "5px", borderRadius: "3px" }}
      >
        Akith's AI Chatbot💻
      </div>
    ),
  },
};

export default config;
