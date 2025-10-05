import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, Text } from "react-native";

import { Provider } from "react-redux";
import store from "./src/redux/store";

import LoginScreen from "./src/screens/LoginScreen";
import ProjectsScreen from "./src/screens/ProjectsScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import ProjectTasksScreen from "./src/screens/ProjectTasksScreen";
import CustomDrawer from "./src/components/CustomDrawer";

const Stack = createNativeStackNavigator();

export default function App() {
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Drawer toggle button
  const DrawerToggle = () => (
    <TouchableOpacity
      style={{ marginLeft: 16 }}
      onPress={() => setDrawerVisible(true)}
    >
      <Text style={{ fontSize: 28, color: "#23254e" }}>≡</Text>
    </TouchableOpacity>
  );

  const headerStyle = {
    backgroundColor: "#00b4ff",
    elevation: 0,
    shadowOpacity: 0,
  };

  const headerTintColor = "#fff";

  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* Custom Drawer */}
        <CustomDrawer
          visible={drawerVisible}
          onClose={() => setDrawerVisible(false)}
        />

        {/* Main Stack Navigator */}
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Projects"
            component={ProjectsScreen}
            options={{
              headerLeft: DrawerToggle,
              title: "",
              headerStyle,
              headerTintColor,
              headerShown: true,
            }}
          />

          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              headerLeft: DrawerToggle,
              title: "Profile",
              headerStyle,
              headerTintColor,
              headerShown: true,
            }}
          />

          <Stack.Screen
            name="ProjectTasks"
            component={ProjectTasksScreen}
            options={({ route }) => ({
              headerLeft: DrawerToggle,
              title: `Tasks - Project #${route.params?.projectId || ""}`,
              headerStyle,
              headerTintColor,
              headerShown: true,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
