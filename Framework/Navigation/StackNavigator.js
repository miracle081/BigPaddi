import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../Screens/HomeScreen';
import { Intro } from '../Screens/Intro';
import { Login } from '../Screens/Login';

const Stack = createStackNavigator();

export function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Intro" component={Intro} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    );
}