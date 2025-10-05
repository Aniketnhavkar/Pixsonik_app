import React, { useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../redux/slices/projectsSlice";
import { useNavigation } from "@react-navigation/native";

export default function ProjectsScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userId = useSelector(state => state.auth.user?.id);
  const { list, loading, error } = useSelector(state => state.projects);

  useEffect(() => {
    if (userId) dispatch(fetchProjects(userId));
  }, [userId]);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#00b4ff" /></View>;
  if (error) return <View style={styles.center}><Text style={{ color: "red" }}>{error}</Text></View>;
  if (!list.length)     return <View style={styles.center}><Text>No projects found.</Text></View>;

  return (
    <FlatList
      data={list}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 20 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.projectCard}
          onPress={() => navigation.navigate("ProjectTasks", { projectId: item.id })}
        >
          <Text style={styles.projectTitle}>{item.name}</Text>
          <Text>{item.description}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  projectCard: {
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  projectTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
});
