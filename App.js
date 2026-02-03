import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

async function registerForPushNotificationsAsync() {
  if (!Device.isDevice)
    return alert("Use a physical device for push notifications");
  const { status: existing } = await Notifications.getPermissionsAsync();
  const { status } =
    existing === "granted"
      ? { status: existing }
      : await Notifications.requestPermissionsAsync();
  if (status !== "granted") throw new Error("Permission not granted");
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
export default function App() {
  function pushNotificationHandler() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: "Here is the notification body",
        data: { data: "goes here" },
      },
      trigger: { seconds: 2 },
    });
  }
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title="Click me" onPress={registerForPushNotificationsAsync} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
