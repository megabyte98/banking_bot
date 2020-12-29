import logo from './logo.svg';
import './App.css';

import {Chatbot} from "react-chatbot-kit";
import MessageParser from "./messageParser";
import config from "./config";
import ActionProvider from './actionProvider';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div >
        <Chatbot style={{maxwidth:"700px"}} config={config} messageParser={MessageParser} actionProvider={ActionProvider}/>
        </div>
      </header>
    </div>
  );
}

export default App;
