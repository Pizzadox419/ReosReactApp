import { Permissions, Notifications } from 'expo';
import firebase from "firebase/index";

export default (async function registerForPushNotificationsAsync() {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    let {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    // Stop here if the user did not grant permissions
    if (status !== 'granted') {
        return;
    }
    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();


    userID = firebase.auth().currentUser.uid;

    firebase.database().ref('/users/' + userID).update({token: token}).catch(() => {
        firebase.database().ref(`/admins/email/` + firebase.auth().currentUser.email).update({token: token});
    });
});