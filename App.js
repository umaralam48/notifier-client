import React, { Fragment } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { ThemeProvider } from "react-native-elements";
import MainScreen from "./src/MainScreen";
export default function App() {
	return (
		<ThemeProvider>
			<Fragment>
				<StatusBar barStyle="dark-content" />
				<SafeAreaView style={{ flex: 1 }}>
					<MainScreen />
				</SafeAreaView>
			</Fragment>
		</ThemeProvider>
	);
}
