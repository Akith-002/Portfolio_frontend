import ActionProvider from "./ActionProvider";

class MessageParser {
  actionProvider: ActionProvider;
  state: any;

  constructor(actionProvider: ActionProvider, state: any) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message: string): void {
    this.actionProvider.handleChatbotAPI(message);
  }
}

export default MessageParser;
