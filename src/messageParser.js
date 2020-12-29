class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
      const lowerCase = message.toLowerCase();
      if(lowerCase.includes("balance")){
        return this.actionProvider.handleBalance();
      }
      if(lowerCase.includes("transfer") || lowerCase.includes("transfer money") || lowerCase.includes("money transfer")){
        return this.actionProvider.handleFundTransfer();
      }
      if(lowerCase.includes("statement") || lowerCase.includes("mini statement")){
        return this.actionProvider.handleMiniStatement();
      }
      return this.actionProvider.handleDefault();
    }
  }
  
  export default MessageParser;