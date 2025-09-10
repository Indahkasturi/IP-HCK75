import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";


export default function ChatBot() {
  const [prompt, setPrompt] = useState(''); 
  const [messages, setMessages] = useState([]);
  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
  if (!prompt) return;

    setMessages((prevMessages) => [...prevMessages, { sender: 'user', text: prompt }]);
  
    const token = localStorage.getItem("access_token");
    if (!token) throw {name: "Unauthorized"}

    try {
      const date = await axios.post('http://localhost:3000/gemini', { prompt }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessages((prevMessages) => [  
        ...prevMessages,
        { sender: 'gemini', text: date.data.result },
      ]);
    } catch (err) {
      console.log(err);
    }

    setPrompt('');
  };
  
    return minimized ? (
      <div
        style={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 120,
        }}
      >
        <button
          onClick={() => setMinimized(false)}
          style={{
            background: '#7DABB7',
            color: '#fff',
            border: 'none',
            borderRadius: 18,
            padding: '12px 28px',
            fontWeight: 700,
            fontSize: 18,
            boxShadow: '0 2px 8px 0 rgba(94, 123, 129, 0.10)',
            cursor: 'pointer',
          }}
        >
          Chatbot
        </button>
      </div>
    ) : (
      <div
        style={{
          background: '#fff',
          color: '#51696E',
          borderRadius: 18,
          boxShadow: '0 6px 32px 0 rgba(94, 123, 129, 0.18)',
          padding: 0,
          width: maximized ? 480 : 320,
          minHeight: maximized ? 320 : 120,
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 120,
          fontFamily: 'Georgia, Times New Roman, Times, serif',
          display: 'flex',
          flexDirection: 'column',
          border: '2.5px solid #AFCCD3',
          overflow: 'hidden',
          transition: 'box-shadow 0.2s, width 0.2s, min-height 0.2s',
        }}
      >
        <div style={{
          background: '#7DABB7',
          color: '#fff',
          fontWeight: 500,
          fontSize: 18,
          padding: '10px 10px 8px 20px',
          borderBottom: '1.5px solid #AFCCD3',
          letterSpacing: 1,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          textShadow: '0 1px 4px rgba(81,105,110,0.10)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <span>Ask Me</span>
          <div>
            <button
              onClick={() => setMaximized(m => !m)}
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: 20,
                fontWeight: 700,
                cursor: 'pointer',
                marginRight: 8,
              }}
              title={maximized ? 'Kecilkan' : 'Perbesar'}
            >
              {maximized ? <>&#x2752;</> : <>&#x2610;</>}
            </button>
            <button
              onClick={() => setMinimized(true)}
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: 20,
                fontWeight: 700,
                cursor: 'pointer',
                marginLeft: 0,
              }}
              title="Minimize"
            >
              &minus;
            </button>
          </div>
        </div>
        <div style={{
          flex: 1,
          background: '#F8FAFC',
          color: '#51696E',
          borderRadius: 0,
          padding: maximized ? 20 : 12,
          margin: 0,
          minHeight: maximized ? 120 : 40,
          maxHeight: maximized ? 220 : 100,
          overflowY: 'auto',
          fontSize: maximized ? 16 : 13,
          borderBottom: '1.5px solid #AFCCD3',
        }}>
          {messages.map((message, index) => (
            <div key={index} style={{
              textAlign: message.sender === 'user' ? 'right' : 'left',
              margin: '5px 0',
            }}>
              <div style={{
                backgroundColor: message.sender === 'user' ? '#A0BEE4' : '#E6F2F7',
                color: '#222',
                padding: maximized ? '8px 16px' : '5px 10px',
                borderRadius: '12px',
                display: 'inline-block',
                whiteSpace: 'pre-wrap',
                fontSize: maximized ? 15 : 13,
                boxShadow: message.sender === 'user' ? '0 1px 4px #A0BEE4' : '0 1px 4px #AFCCD3',
                maxWidth: '90%',
              }}>
                <ReactMarkdown>{message.text}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', background: '#fff', padding: maximized ? '12px 20px 20px 20px' : '8px 12px 12px 12px', borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type a message..."
            required
            style={{
              flex: 1,
              border: '1.5px solid #AFCCD3',
              borderRadius: 8,
              padding: maximized ? '10px 16px' : '6px 10px',
              fontSize: maximized ? 15 : 13,
              fontFamily: 'Georgia, Times New Roman, Times, serif',
              outline: 'none',
              marginRight: 8,
              color: '#51696E',
              background: '#F8FAFC',
              transition: 'border 0.2s',
            }}
          />
          <button
            type="submit"
            style={{
              background: '#5E7B81',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: maximized ? '10px 22px' : '6px 16px',
              fontWeight: 700,
              fontSize: maximized ? 15 : 13,
              cursor: 'pointer',
              transition: 'background 0.2s',
              boxShadow: '0 2px 8px 0 rgba(94, 123, 129, 0.10)',
            }}
            onMouseOver={e => e.currentTarget.style.background = '#7DABB7'}
            onMouseOut={e => e.currentTarget.style.background = '#5E7B81'}
          >
            Send
          </button>
        </form>
      </div>
    );
}

  
