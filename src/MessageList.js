import React, { useState, useEffect } from "react";
import { FlatList, Platform, View } from "react-native";
import { ListItem } from "react-native-elements";
import axios from "axios";
const httpUrl = Platform.select({
	ios: "https://localhost:3000",
	android: "http://192.168.43.186:3000",
});

const wsUrl = Platform.select({
	ios: "https://localhost:3000",
	android: "http://192.168.43.186:3000",
});

const loadInitialData = async (setMessages) => {
	try {
		const messages = await axios.get(`${httpUrl}/list`);
		setMessages(messages.data);
	} catch (error) {
		console.log(error);
	}
};
let socket;
const setupWebsocket = (addMessage) => {
	if (!socket) {
		socket = new WebSocket(wsUrl);
		console.log("Attempting connection");
		socket.onopen = () => console.log("Successfully Connected");
		socket.onclose = (event) => {
			console.log(`Connection closed : ${event}`);
			socket = null;
		};
		socket.onerror = (err) => console.log("Socket error : " + err);
	}
	socket.onmessage = (event) => {
		addMessage(JSON.parse(event.data));
	};
};

export default function MessageList() {
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		loadInitialData(setMessages);
	}, []);

	useEffect(() => {
		setupWebsocket((newmsg) => {
			setMessages([newmsg, ...messages]);
		});
	}, [messages]);

	return (
		<View style={{ flex: 1 }}>
			<FlatList data={messages} keyExtractor={(item) => item._id} renderItem={({ item }) => <ListItem title={item.text} bottomDivider />} />
		</View>
	);
}
