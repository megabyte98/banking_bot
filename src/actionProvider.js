import axios from "axios";

class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
      this.createClientMessage = createClientMessage;
    }

    handleLogin = async () => {
      const message = this.createChatBotMessage(
        "Enter your Credentials to avail our Services " ,
        {
          withAvatar: true,
          widget: "Login",
        }
      );
      this.addMessageToBotState(message)
    }

    handleInvalid = async () => {
      const message = this.createChatBotMessage(
      "Invalid Credentials , Please try again !!" ,
        {
          withAvatar: true,
          widget: "Login",
        }
      );
      this.addMessageToBotState(message)
    }

    handleLogOut = async (state) => {
      this.setState((state) => ({...state,userId : ""}) )
      const message = this.createChatBotMessage(
      "Thank You For Using our Services !!" ,
        {
          withAvatar: true,
          widget: "Login",
        }
      );
      this.addMessageToBotState(message)
    }

    handleBalance = async (userId) => {
      try{
        const config = {
          headers: {
              'Content-Type': 'application/json'
          }
      }
        const res=await axios.get(`http://localhost:5000/api/balance/${userId}`,config);
        console.log(res.data); 
        const message = this.createChatBotMessage(
          `your available balance is INR ${res.data.curBal}`
        );
        this.addMessageToBotState(message)
      }catch(err){
        console.log(err)
      }
    }

    handleAddBen = () => {
      const message = this.createChatBotMessage(
        "Enter Following details for adding Beneficiary " ,
        {
          withAvatar: true,
          widget: "AddBenForm",
        }
      );
      this.addMessageToBotState(message)
    }

    handleMiniStatement = async (userId) => {
      try{
        const config = {
          headers: {
              'Content-Type': 'application/json'
          }
      }
        const res=await axios.get(`http://localhost:5000/api/statement/${userId}`,config);
        console.log(res.data);
        if(res.data.length > 0){
          const message = this.createChatBotMessage(
            'Generated Mini Statement -'
          );
          this.addMessageToBotState(message)
          res.data.forEach(async (element) => {
            const {data} = await axios.get(`http://localhost:5000/api/fund/${element.recTrans}`,config);
            console.log(data)
            const message = this.createChatBotMessage(
              `INR ${data.amount} dedited from Savings via ${data.type} to ${data.benName} remaining balance INR ${data.balance}`
            );
            this.addMessageToBotState(message) 
          }); 
        }
        else{
          const message = this.createChatBotMessage(
            'No Recent Transactions to show'
          );
          this.addMessageToBotState(message) 
        } 
      }catch(err){
        console.log(err)
      }
    }

    handleFundTransfer =async () => {
      const message = this.createChatBotMessage(
        "Enter following details for Fund Transfer " ,
        {
          withAvatar: false,
          widget: "FundForm",
        }
      );
      this.addMessageToBotState(message)
    }


    handleSuccessful = () => {
      const message = this.createChatBotMessage(
        "Transaction Successfull",
      );
      this.addMessageToBotState(message)
      
      const message1 = this.createChatBotMessage(
        "How can I help? Here are the available services",
        {
          withAvatar: true,
          widget: "GeneralOptions",
        }
      );
      this.addMessageToBotState(message1)
    };

    handleSuccessfulBen = () => {
      const message = this.createChatBotMessage(
        "Benefficiary Added successfully , initiating Fund Trasfer",
        {
          withAvatar: false,
          widget: "FundForm",
        }
      );
      this.addMessageToBotState(message)
      
    };


    handleFailFund = () => {
      const message = this.createChatBotMessage(
        "Insufficient Fund For Transaction !",
        {
          withAvatar: true,
          widget: "GeneralOptions",
        }
      );
      this.addMessageToBotState(message)
    };

    handleMinBal = () => {
      const message = this.createChatBotMessage(
        "Minimum balance INR !00 to retain in account",
        {
          withAvatar: true,
          widget: "GeneralOptions",
        }
      );
      this.addMessageToBotState(message)
    };


    handleFail = () => {
      const message = this.createChatBotMessage(
        "Please add the beneficiary before transaction",
        {
          withAvatar: true,
          widget: "AddBenForm",
        }
      );
      this.addMessageToBotState(message)
    };

    handleDefault = () => {
      const message = this.createChatBotMessage(
        "How can I help? Here are the available services",
        {
          withAvatar: true,
          widget: "GeneralOptions",
        }
      );
      this.addMessageToBotState(message)
    };

    addMessageToBotState = (messages, newState) => {
      if (Array.isArray(messages)) {
        this.setState((state) => ({
          ...state,
          ...newState,
          messages: [...state.messages, ...messages],     
        }));
      } else {
        this.setState((state) => ({
          ...state,
          ...newState,
          messages: [...state.messages, messages],
        }));
      }
    };
  }
  
  export default ActionProvider;