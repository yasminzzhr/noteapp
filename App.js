import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import login from './screens/login';
import Menu from './screens/menu';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="login" component={login} option={{headerTransparent: true}}/>
      <Stack.Screen name="menu" component={Menu} option={{headerTitle: ''}}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}