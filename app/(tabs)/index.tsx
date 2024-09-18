import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CategoriesScreen from '../../screens/CategoriesScreen';
import MealsScreen from '../../screens/MealsScreen';
import MealDetailScreen from '../../screens/MealDetailScreen';
import FavoritesScreen from '../../screens/FavoritesScreen';
import SettingsScreen from '../../screens/SettingsScreen';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const MealsNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Categories">
      <Stack.Screen name="Menu" component={CategoriesScreen} />
      <Stack.Screen name="Meals" component={MealsScreen} />
      <Stack.Screen name="MealDetail" component={MealDetailScreen} />
    </Stack.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    
    <Drawer.Navigator
    screenOptions={{
      drawerStyle: {
        backgroundColor: 'white',
      },
      drawerActiveTintColor: 'red',
      drawerInactiveTintColor: 'gray',
      drawerLabelStyle: {
        fontSize: 16,
      },
    }}
  >
      <Drawer.Screen name="Categories" component={MealsNavigator} />
      <Drawer.Screen name="Favorite" component={FavoritesScreen} />
      <Drawer.Screen name="Setting" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Favorites') {
            iconName = 'star';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
        tabBarIndicatorStyle: { backgroundColor: 'red' },
      })}
    >
      <Tabs.Screen name="Home" component={DrawerNavigator} options={{ title: 'Home' }} />
      <Tabs.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favorites' }} />
      <Tabs.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
    </Tabs.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <TabNavigator />
    </NavigationContainer>
  );
}
