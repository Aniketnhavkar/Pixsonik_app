import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, token } = useSelector((state) => state.auth);

  useEffect(() => {
    // Navigate when token is present (login success)
    if (token) {
      navigation.replace("Projects");
    }
  }, [token]);

  const onLogin = () => {
    dispatch(loginUser({ email, password }));
  };

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <View style={styles.wave} />
        <Text style={styles.title}>Welcome back !</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
        />
        <View style={styles.passwordRow}>
          <TextInput
            style={[styles.input, { flex: 1, marginVertical: 0 }]}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPass}
          />
          <TouchableOpacity onPress={() => setShowPass(!showPass)} style={styles.eye}>
            <Text style={{ fontSize: 16 }}>{showPass ? "🙈" : "👁️"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.checkboxRow} onPress={() => setRemember(!remember)}>
            <View style={[styles.checkbox, remember && styles.checkboxChecked]} />
            <Text style={styles.rememberText}>Remember me</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.forgot}>Forget password?</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#267bff" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={onLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        )}

        {error && <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>}

        {/* For quick manual navigation testing */}
        {/* <TouchableOpacity onPress={() => navigation.replace("Projects")}>
          <Text style={{ color: "#267bff", marginTop: 20, textAlign: "center" }}>
            Go to Projects (Test)
          </Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00b4ff" },
  card: {
    width: "92%",
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 22,
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
  logo: { width: 150, height: 80, resizeMode: "contain", marginBottom: 6 },
  wave: { width: "100%", height: 12, backgroundColor: "#6a66ff", borderRadius: 6, marginBottom: 10 },
  title: { fontSize: 24, fontWeight: "700", color: "#21264d", marginVertical: 12 },
  input: {
    width: "100%",
    backgroundColor: "#f2f4fb",
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginVertical: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e2e6f0",
  },
  passwordRow: { flexDirection: "row", alignItems: "center", width: "100%", marginVertical: 8 },
  eye: { width: 40, alignItems: "center", justifyContent: "center", marginLeft: -36 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: 10 },
  checkboxRow: { flexDirection: "row", alignItems: "center" },
  checkbox: { width: 18, height: 18, borderRadius: 4, borderWidth: 2, borderColor: "#aaa", marginRight: 6, backgroundColor: "#fff" },
  checkboxChecked: { backgroundColor: "#3b8df2", borderColor: "#3b8df2" },
  rememberText: { color: "#222", fontSize: 15 },
  forgot: { color: "#527bed", fontWeight: "bold", fontSize: 15 },
  button: { marginTop: 18, width: "100%", backgroundColor: "#267bff", borderRadius: 30, paddingVertical: 14, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 17 },
});
