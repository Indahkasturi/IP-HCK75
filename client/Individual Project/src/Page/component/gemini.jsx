import axios from "axios";
import { useState } from "react";


export default function ChatBot () {
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState([]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
    };
  
    return (
      <div style={{
        position: 'fixed',
        bottom: '10px',
        left: '67%',
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '10px',
      }}>
        <h5>Ask Me</h5>
  
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type a message..."
            required
            style={{ width: '70%' }}
          />
          <button type="submit" style={{ marginLeft: '5px' }}>
            Send
          </button>
        </form>
      </div>
    );
  };
  
  
