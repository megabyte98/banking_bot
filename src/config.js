import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import GeneralOptions from "./widgets/Services/GeneralOptions/GeneralOptions";
import BeneficiarySelector from "./widgets/Beneficiary/BeneficiarySelector";

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
    "Here are the services provided by me.",
    {
      withAvatar: false,
      delay: 500,
      widget: "GeneralOptions",
    }
  ),   
],
state: {
  selectedBeneficiary : "",
},
customComponents: {},
widgets: [
  {
    widgetName: "BeneficiarySelector",
    widgetFunc: (props) => <BeneficiarySelector {...props} />,
    mapStateToProps: ["selectedBeneficiary"],
  },
  {
    widgetName: "GeneralOptions",
    widgetFunc: (props) => <GeneralOptions {...props} />,
  },
],
};

export default config