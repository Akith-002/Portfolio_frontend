import ReactMarkdown from "react-markdown";

const BackEnd_URL = import.meta.env.VITE_BACK_END_URL;

class ActionProvider {
  constructor(
    createChatBotMessage,
    setStateFunc,
    createClientMessage,
    stateRef,
    createCustomMessage,
    ...rest
  ) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.stateRef = stateRef;
    this.createCustomMessage = createCustomMessage;
  }

  async handleChatbotAPI(userMessage) {
    // API call to your backend
    const response = await fetch(`${BackEnd_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();

    console.log(data);

    // Create a new chatbot message with the response
    const botMessage = this.createChatBotMessage(
      <ReactMarkdown>{data}</ReactMarkdown>
    );

    // Update the state with the new message
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, botMessage],
    }));
  }
}

export default ActionProvider;
