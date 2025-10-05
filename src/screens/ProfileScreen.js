import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../redux/slices/profileSlice";

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.user?.id);
  const { data, loading, error } = useSelector(state => state.profile);

  useEffect(() => {
    if (userId) dispatch(fetchProfile(userId));
  }, [userId]);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#00b4ff" /></View>;
  if (error) return <View style={styles.center}><Text style={{ color: "red" }}>{error}</Text></View>;
  if (!data) return <View style={styles.center}><Text>No profile data found.</Text></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{data.name}</Text>
      <Text>Email: {data.email}</Text>
      <Text>Phone: {data.phone}</Text>
      <Text>Department: {data.department}</Text>
      <Text>Role: {data.role}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { padding: 20 },
  name: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
});
