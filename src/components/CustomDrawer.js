import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { clockIn, clockOut } from "../redux/slices/attendanceSlice";
import { fetchProjects } from "../redux/slices/projectsSlice";
import { useNavigation } from "@react-navigation/native";

export default function CustomDrawer({ visible, onClose }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.user?.id);

  const isCheckedIn = useSelector((state) => state.attendance.isCheckedIn);
  const loading = useSelector((state) => state.attendance.loading);

  const { list: projects, loading: projLoading } = useSelector(
    (state) => state.projects
  );

  // Fetch projects dynamically for logged-in user
  useEffect(() => {
    if (visible && token && userId) {
      dispatch(fetchProjects());
    }
  }, [visible, token, userId]);

  const handleCheckIn = async () => {
    try {
      await dispatch(clockIn()).unwrap();
      Alert.alert("Success", "Checked in successfully");
    } catch (err) {
      Alert.alert("Error", err || "Failed to check in");
    }
  };

  const handleCheckOut = async () => {
    try {
      await dispatch(clockOut()).unwrap();
      Alert.alert("Success", "Checked out successfully");
    } catch (err) {
      Alert.alert("Error", err || "Failed to check out");
    }
  };

  if (!visible) return null;

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.overlay}>
        <View style={styles.menu}>
          <Image source={require("../assets/logo.png")} style={styles.logo} />

          <Text style={styles.sectionTitle}>Projects</Text>
          {projLoading ? (
            <ActivityIndicator
              size="small"
              color="#fff"
              style={{ marginTop: 8 }}
            />
          ) : (
            <ScrollView style={{ maxHeight: 200 }}>
              {projects.map((proj) => (
                <TouchableOpacity
                  key={proj.id}
                  style={styles.menuItem}
                  onPress={() => {
                    onClose();
                    navigation.navigate("ProjectTasks", { projectId: proj.id });
                  }}
                >
                  <Text style={styles.menuText}>{proj.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          <View style={styles.profileContainer}>
            <TouchableOpacity
              onPress={() => {
                onClose();
                navigation.navigate("Profile");
              }}
            >
              <Image
                source={require("../assets/Profile.png")}
                style={styles.profileLogo}
              />
            </TouchableOpacity>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                disabled={loading}
                style={[
                  styles.checkButton,
                  styles.checkInButton,
                  isCheckedIn && styles.activeCheckIn,
                  loading && { opacity: 0.6 },
                ]}
                onPress={handleCheckIn}
              >
                <Text
                  style={[
                    styles.checkButtonText,
                    isCheckedIn && styles.activeText,
                  ]}
                >
                  Check In
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={loading}
                style={[
                  styles.checkButton,
                  styles.checkOutButton,
                  !isCheckedIn && styles.activeCheckOut,
                  loading && { opacity: 0.6 },
                ]}
                onPress={handleCheckOut}
              >
                <Text
                  style={[
                    styles.checkButtonText,
                    !isCheckedIn && styles.activeText,
                  ]}
                >
                  Check Out
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.15)",
    zIndex: 100,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  menu: {
    backgroundColor: "#00b4ff",
    width: 240,
    paddingTop: 40,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    elevation: 8,
    minHeight: "100%",
    flex: 1,
    position: "relative",
  },
  logo: {
    width: 150,
    height: 80,
    resizeMode: "contain",
    marginBottom: 16,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  menuItem: { paddingVertical: 8 },
  menuText: { fontSize: 16, color: "#fff" },
  profileContainer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  profileLogo: {
    width: 44,
    height: 44,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "#eee",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    paddingHorizontal: 8,
    marginTop: 10,
  },
  checkButton: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginHorizontal: 3,
    borderWidth: 1,
    alignItems: "center",
  },
  checkInButton: {
    borderColor: "#4CAF50",
    backgroundColor: "rgba(76, 175, 80, 0.2)",
  },
  checkOutButton: {
    borderColor: "#F44336",
    backgroundColor: "rgba(244, 67, 54, 0.2)",
  },
  activeCheckIn: { backgroundColor: "#4CAF50" },
  activeCheckOut: { backgroundColor: "#F44336" },
  checkButtonText: { fontSize: 11, fontWeight: "bold", color: "#fff" },
  activeText: { color: "#fff" },
});

