import axios from "axios";

class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
      this.createClientMessage = createClientMessage;
    }

    handleBalance = async () => {
      try{
        const config = {
          headers: {
              'Content-Type': 'application/json'
          }
      }
        const res=await axios.get('http://localhost:5000/api/balance/1',config);
        console.log(res.data); 
        const message = this.createChatBotMessage(
          `your available balance is INR ${res.data.curBal}`
        );
        this.addMessageToBotState(message)
      }catch(err){
        console.log(err)
      }
    }

    handleMiniStatement = async () => {
      try{
        const config = {
          headers: {
              'Content-Type': 'application/json'
          }
      }
        const res=await axios.get('http://localhost:5000/api/statement/1',config);
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
      try{
        const config = {
          headers: {
              'Content-Type': 'application/json'
          }
      }
        const res=await axios.get('http://localhost:5000/api/ben/allBen/2',config);
        // console.log(res.data); 
        if(res.data.length > 0){
          const message = this.createChatBotMessage(
            "Please Select/Add a Beneficiary to initiate fund transfer",
            {
              withAvatar: true,
              widget: "BeneficiarySelector",
            }
          ); 
          this.addMessageToBotState(message) 
        }
        else{
          const message = this.createChatBotMessage(
            "Please Add a Beneficiary to initiate fund transfer",
            {
              withAvatar: true,
              widget: "GeneralOptions",
            }
          ); 
          this.addMessageToBotState(message) 
        }
      }catch(err){
        console.log(err)
      }
    }

    handleInitiate = () => {
      const message = this.createChatBotMessage(
        "Enter The amount to be transfered ",
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