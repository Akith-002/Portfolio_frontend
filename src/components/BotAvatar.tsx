import React from "react";

import botImg from "/assets/images/BOT-Image.gif";

const BotAvatar: React.FC = () => {
  return (
    <div className="react-chatbot-kit-chat-bot-avatar">
      <div className="flex justify-center items-center w-12 h-12 border border-gray-600 rounded-full shadow-[0_0_6px] object-cover overflow-hidden">
        <img className="min-w-[110px]" src={botImg} loading="lazy" alt="Bot" />
      </div>
    </div>
  );
};

export default BotAvatar;
