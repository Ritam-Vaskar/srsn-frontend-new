import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import styles from "./AlumniChat.module.scss";



const AlumniChat = () => {
    const socket = io.connect(import.meta.env.VITE_BACKEND_URL, {
        query: {
            user: JSON.stringify(useSelector((state) => state?.user?.user || state?.alumni?.alumni)),
        },
    });
    const user = useSelector((state) => state?.user?.user);
    const alumni = useSelector((state) => state?.alumni?.alumni);

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        // Fetch all messages on initial load
        socket.on("all_messages", (allMessages) => {
            const filteredMessages = filterMessages(allMessages);
            setMessages(filteredMessages);
            console.log("All messages triggered");
        });

        // Listen for new messages
        socket.on("receive_message", (message) => {
            const filteredMessages = filterMessages([message]);
            if (filteredMessages.length > 0) {
                setMessages((prev) => [...prev, ...filteredMessages]);
            }
            console.log("New message triggered", message);
        });

        return () => {
            socket.off("all_messages");
            socket.off("receive_message");
        };
    }, [user, alumni]);

    const filterMessages = (allMessages) => {
        if (user?.role === "Admin" || user?.role === "Teacher") {

            return allMessages;
        } else if (alumni) {

            return allMessages.filter(
                (msg) =>
                    msg.role === "Admin" ||
                    msg.role === "Teacher" ||
                    (msg.role === "Alumni" && msg.senderID === alumni._id)
            );
        }
        return [];
    };

    const sendMessage = () => {
        if (!newMessage.trim()) return;

        const messageDetails = {
            content: newMessage,
            senderName: "",
            senderPhoto: "",
            role: "",
            senderID: "",
        };

        if (user) {
            messageDetails.senderName = user.name;
            messageDetails.senderPhoto = user.profilePic;
            messageDetails.role = user.role;
            messageDetails.senderID = user._id;

            if (user.role === "Teacher" || user.role === "Admin") {
                socket.emit("send_message", messageDetails);
                // setMessages((prev) => [...prev, messageDetails]);
            } else {
                console.error("User does not have the required role to send messages.");
            }
        } else if (alumni) {
            messageDetails.senderName = alumni.name;
            messageDetails.senderPhoto = alumni.profilePic;
            messageDetails.role = "Alumni";
            messageDetails.senderID = alumni._id;

            socket.emit("send_message", messageDetails);
            // setMessages((prev) => [...prev, messageDetails]);
        } else {
            console.error("No user or admin logged in. Message cannot be sent.");
        }

        setNewMessage("");
    };

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatHeader}>
                <h2>Alumni Chat</h2>
                <p>Logged in as: {user?.name || alumni?.name || "Guest"}</p>
            </div>
            <div className={styles.chatBody}>
                {messages.map((message, index) => (
                    <div key={index} className={styles.message}>
                        <img
                            src={message.senderPhoto || "https://via.placeholder.com/40"}
                            alt="User"
                            className={styles.senderPhoto}
                        />
                        <div className={styles.messageContent}>
                            <p className={styles.senderName}>{message.senderName}</p>
                            <p>{message.content}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.chatFooter}>
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default AlumniChat;


