import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import styles from "./AlumniChat.module.scss";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";

const AlumniChat = () => {
    // Use same origin - nginx will proxy socket.io to backend
    // In development, Vite proxy handles this
    // In production, nginx reverse proxy handles this
    const socketUrl = import.meta.env.VITE_BACKEND_URL || window.location.origin;
    const socket = io.connect(socketUrl, {
        query: {
            user: JSON.stringify(useSelector((state) => state?.user?.user || state?.alumni?.alumni)),
        },
    });
    const user = useSelector((state) => state?.user?.user);
    const alumni = useSelector((state) => state?.alumni?.alumni);

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const chatBodyRef = useRef(null);

    useEffect(() => {
        socket.on("all_messages", (allMessages) => {
            const filteredMessages = filterMessages(allMessages);
            setMessages(filteredMessages);
        });

        socket.on("receive_message", (message) => {
            const filteredMessages = filterMessages([message]);
            if (filteredMessages.length > 0) {
                setMessages((prev) => [...prev, ...filteredMessages]);
            }
        });

        return () => {
            socket.off("all_messages");
            socket.off("receive_message");
        };
    }, [user, alumni]);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);

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

    const groupMessagesByDate = (messages) => {
        const grouped = {};
        messages.forEach((message) => {
            const date = new Date(message.updatedAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
            });
            if (!grouped[date]) {
                grouped[date] = [];
            }
            grouped[date].push(message);
        });
        return grouped;
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); // Example: 12:30 PM
    };

    const sendMessage = () => {
        if (!newMessage.trim()) return;

        const messageDetails = {
            content: newMessage,
            senderName: "",
            senderPhoto: "",
            role: "",
            senderID: "",
            updatedAt: new Date().toISOString(),
        };

        if (user) {
            messageDetails.senderName = user.name;
            messageDetails.senderPhoto = user.profilePic;
            messageDetails.role = user.role;
            messageDetails.senderID = user._id;

            if (user.role === "Teacher" || user.role === "Admin") {
                socket.emit("send_message", messageDetails);
            } else {
                console.error("User does not have the required role to send messages.");
            }
        } else if (alumni) {
            messageDetails.senderName = alumni.name;
            messageDetails.senderPhoto = alumni.profilePic;
            messageDetails.role = "Alumni";
            messageDetails.senderID = alumni._id;

            socket.emit("send_message", messageDetails);
        } else {
            toast.error("No user or admin logged in. Message cannot be sent.");
        }

        setNewMessage("");
    };

    const groupedMessages = groupMessagesByDate(messages);

    const canDeleteMessage = (messageTime) => {
        const currentTime = new Date();
        const messageTimeDate = new Date(messageTime);
        const timeDifference = (currentTime - messageTimeDate) / 1000 / 60; 
        return timeDifference <= 2; 
    };


    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatHeader}>
                <h2>Alumni Chat</h2>
                <p>Logged in as: {user?.name || alumni?.name || "Guest"}</p>
            </div>
            <div className={styles.chatBody} ref={chatBodyRef}>
                {Object.keys(groupedMessages).map((date) => (
                    <div key={date}>
                        <div className={styles.dateSeparator}>{date}</div>
                        {groupedMessages[date].map((message, index) => (
                            <div
                                key={index}
                                className={
                                    message.senderID === (alumni?._id || user?._id)
                                        ? styles.sendmessage
                                        : styles.message
                                }
                            >
                                {(message.senderID === user?._id || message.senderID === alumni?._id) &&
                                    canDeleteMessage(message.updatedAt) && (
                                        <DeleteIcon
                                            className={styles.deleteIcon}
                                            onClick={() => {
                                                canDeleteMessage(message.updatedAt) && socket.emit("delete_message", message);
                                            }}
                                        />
                                    )}
                                <img
                                    src={message.senderPhoto || "https://via.placeholder.com/40"}
                                    alt="User"
                                    className={styles.senderPhoto}
                                />
                                <div className={styles.messageContent}>
                                    <p className={styles.senderName}>{message.senderName}</p>
                                    <p>{message.content}</p>
                                    <p className={styles.messageTime}>{formatTime(message.updatedAt)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className={styles.chatFooter}>
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            sendMessage();
                        }
                    }}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default AlumniChat;
