class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
      console.log(this.state)
      if(this.state.userId === ""){
        return this.actionProvider.handleLogin()
      }
      const lowerCase = message.toLowerCase();
      if(lowerCase.includes("balance")){
        return this.actionProvider.handleBalance(this.state.userId);
      }
      if(lowerCase.includes("logout") || lowerCase.includes("signout")){
        return this.actionProvider.handleLogOut(this.state);
      }
      if(lowerCase.includes("transfer") || lowerCase.includes("transfer money") || lowerCase.includes("money transfer")){
        return this.actionProvider.handleFundTransfer();
      }
      if(lowerCase.includes("statement") || lowerCase.includes("mini statement")){
        return this.actionProvider.handleMiniStatement(this.state.userId);
      }
      if(lowerCase.includes("add beneficiary") || lowerCase.includes("beneficiary")){
        return this.actionProvider.handleAddBen();
      }
      return this.actionProvider.handleDefault();
    }
  }
  
  export default MessageParser;