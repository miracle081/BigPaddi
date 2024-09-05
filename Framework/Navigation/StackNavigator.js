import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../Screens/HomeScreen';
import { Intro } from '../Screens/Intro';
import { Login } from '../Screens/Login';
import { Profile } from '../Screens/Profile';
import { Signup } from '../Screens/Signup';
import { PostProduct } from '../Screens/PostProduct';
import { EditProfile } from '../Screens/EditProfile';
import { FundAccount } from '../Screens/FundAccount';
import { ChangePassword } from '../Screens/ChangePassword';
import { ForgotPassword } from '../Screens/ForgotPassword';
import { Details } from '../Screens/Details';
import { Cart } from '../Screens/Cart';
import { Pay } from '../Screens/Pay';
import { MyProducts } from '../Screens/MyProducts';

const Stack = createStackNavigator();

export function StackNavigator() {
    return (
        <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen name="Intro" component={Intro} options={{ headerShown: false }} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
            <Stack.Screen name="PostProduct" component={PostProduct} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="Pay" component={Pay} options={{ headerShown: false }} />
            <Stack.Screen name="FundAccount" component={FundAccount} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="MyProducts" component={MyProducts} />
        </Stack.Navigator>
    );
}