import ReactMarkdown from "react-markdown";

const BackEnd_URL = import.meta.env.VITE_BACK_END_URL;

interface StateRef {
  messages: any[];
}

class ActionProvider {
  createChatBotMessage: (message: React.ReactNode) => any;
  setState: (updateFunc: (prevState: any) => any) => void;
  createClientMessage: any;
  stateRef: React.MutableRefObject<StateRef>;
  createCustomMessage: any;

  constructor(
    createChatBotMessage: (message: React.ReactNode) => any,
    setStateFunc: (updateFunc: (prevState: any) => any) => void,
    createClientMessage: any,
    stateRef: React.MutableRefObject<StateRef>,
    createCustomMessage: any
  ) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.stateRef = stateRef;
    this.createCustomMessage = createCustomMessage;
  }

  async handleChatbotAPI(userMessage: string): Promise<void> {
    try {
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
      this.setState((prevState: any) => ({
        ...prevState,
        messages: [...prevState.messages, botMessage],
      }));
    } catch (error) {
      console.error("Error calling chatbot API:", error);
      const errorMessage = this.createChatBotMessage(
        "Sorry, I encountered an error. Please try again."
      );
      this.setState((prevState: any) => ({
        ...prevState,
        messages: [...prevState.messages, errorMessage],
      }));
    }
  }
}

export default ActionProvider;
