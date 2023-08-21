import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import './Chatting.css';

function Chatting() {

    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputName, setInputName] = useState('');
    const [inputMessage, setInputMessage] = useState('');

    useEffect(() => {
        const socket = new SockJS('http://127.0.0.1:3000/chat');
        const stomp = Stomp.over(socket);
        setStompClient(stomp);

        stomp.connect({}, () => {
            console.log('WebSocket 연결됨');
            stomp.subscribe('/receivePoint/receive', (message) => {
                const receivedMessage = JSON.parse(message.body);
                setMessages((prevMessages) => [...prevMessages, receivedMessage]);
            });
        });

        return () => {
            if (stomp) {
                stomp.disconnect();
            }
        };
    }, []);

    const sendMessage = () => {
        if (stompClient && inputMessage.trim() !== '') {
            const messageObj = { content: inputMessage, sendid: inputName };
            stompClient.send('/sendPoint/send', {}, JSON.stringify(messageObj));
            setInputMessage('');
        }
    };

    return (
        <div>
            <div className="row">
                <div className="col-md-8 mx-auto">
                    <div className="border rounded p-4" style={{ "minHeight": "300px", "overflowY": "scroll" }}>
                        {messages.map((message, index) => (
                            <div key={index} className={`message ${message.sendid === inputName ? 'my-message' : 'other-message'}`}>
                                <span className="message-sender">{message.sendid}:</span> {message.content}
                            </div>
                        ))}
                    </div>
                    <div className="input-box mt-3">
                        <input
                            type="text"
                            className="form-control mb-2 w-25 d-inline-block"
                            value={inputName}
                            onChange={(e) => setInputName(e.target.value)}
                            placeholder="Your name..."
                        />
                        <input
                            type="text"
                            className="form-control mb-2 w-75 d-inline-block"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Type a message..."
                        />
                        <button className="btn btn-primary" onClick={sendMessage}>Send</button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Chatting;