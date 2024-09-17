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
    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();

    console.log(data);

    // Create a new chatbot message with the response
    const botMessage = this.createChatBotMessage(data);

    // Update the state with the new message
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, botMessage],
    }));
  }
}

export default ActionProvider;
