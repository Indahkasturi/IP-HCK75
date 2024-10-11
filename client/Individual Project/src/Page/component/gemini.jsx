import { useState } from "react";
import axios from "axios";

export default function ChatBot() {
  const [prompt, setPrompt] = useState(''); 
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (prompt); 
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
        { sender: 'gemini', text: date.data },
      ]);
    } catch (err) {
      console.log(err);
    }

    setPrompt('');
  };
  
  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      backgroundColor: 'black',
      borderRadius: '10px',
      padding: '10px',
      width: '300px',
    }}>
      <h5 style={{ color: 'white' }}>Ask Me</h5>

      {/* Chat messages display */}
      <div style={{
        backgroundColor: 'white',
        height: '200px',
        overflowY: 'scroll',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '10px',
      }}>
        {messages.map((message, index) => (
          <div key={index} style={{
            textAlign: message.sender === 'user' ? 'right' : 'left',
            margin: '5px 0',
          }}>
            <span style={{
              backgroundColor: message.sender === 'user' ? '#d1e7dd' : '#f0f0f0',
              padding: '5px 10px',
              borderRadius: '10px',
              display: 'inline-block',
            }}>
              {message.text}
            </span>
          </div>
        ))}
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type a message..."
          required
          style={{ flex: 1, padding: '5px', borderRadius: '5px' }}
        />
        <button type="submit" style={{ marginLeft: '5px', padding: '5px 10px' }}>
          Send
        </button>
      </form>
    </div>
  );
}


// import axios from "axios";
// import { useState } from "react";


// export default function ChatBot () {
//     const [prompt, setPrompt] = useState('');
//     const [messages, setMessages] = useState([]);
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
      
//     };
  
//     return (
//       <div style={{
//         position: 'fixed',
//         bottom: '10px',
//         left: '85%',
//         backgroundColor: 'black',
//         borderRadius: '10px',
//         padding: '10px',
//       }}>
//         <h5 style={{color: 'white'}}>Ask Me</h5>
  
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             value={prompt}
//             onChange={(e) => setPrompt(e.target.value)}
//             placeholder="Type a message..."
//             required
//             style={{ width: '70%' }}
//           />
//           <button type="submit" style={{ marginLeft: '5px' }}>
//             Send
//           </button>
//         </form>
//       </div>
//     );
//   };
  
  
