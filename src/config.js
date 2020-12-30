import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import GeneralOptions from "./widgets/Services/GeneralOptions/GeneralOptions";
import FundForm from "./widgets/Forms/fundForm";
import AddBenForm from "./widgets/Forms/beneficiaryForm";
import Login from "./widgets/Forms/user";


const botName = "FinBot";

const config = {
  botName: botName,
  lang: "no",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
  initialMessages: [createChatBotMessage(`Hi I'm ${botName}. I’m here to help you with your finances.`),
  createChatBotMessage(
    "Please Login !!",
    {
      withAvatar: false,
      delay: 500,
      widget: "Login",
    }
  ),   
],
state: {
  userId : ""
},
customComponents: {},
widgets: [
  {
    widgetName: "FundForm",
    widgetFunc: (props,state) => <FundForm {...props} />,
    mapStateToProps: ["userId"],
  },
  {
    widgetName: "GeneralOptions",
    widgetFunc: (props,state) => <GeneralOptions {...props} />,
    mapStateToProps: ["userId"],
  },
  {
    widgetName: "AddBenForm",
    widgetFunc: (props,state) => <AddBenForm {...props} />,
    mapStateToProps: ["userId"],
  },
  {
    widgetName: "Login",
    widgetFunc: (props,state) => <Login {...props} />,
    mapStateToProps: ["userId"],
  },
],
};

export default config