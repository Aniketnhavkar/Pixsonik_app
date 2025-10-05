import React, { useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";
import { fetchProjectTasks } from "../redux/slices/tasksSlice";

export default function ProjectTasksScreen() {
  const route = useRoute();
  const dispatch = useDispatch();

  const projectId = route.params?.projectId;
  const { byProject, loading, error } = useSelector(state => state.tasks);

  useEffect(() => {
    if (projectId) dispatch(fetchProjectTasks({ projectId }));
  }, [projectId]);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#00b4ff" /></View>;
  if (error) return <View style={styles.center}><Text style={{ color: "red" }}>{error}</Text></View>;

  const tasks = byProject[projectId] || [];
  if (!tasks.length) return <View style={styles.center}><Text>No tasks available for this project.</Text></View>;

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 20 }}
      renderItem={({ item }) => (
        <View style={styles.taskCard}>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <Text>Status: {item.status}</Text>
          <Text>Deadline: {item.deadline}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  taskCard: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  taskTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
});
