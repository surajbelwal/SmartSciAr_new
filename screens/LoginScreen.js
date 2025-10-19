import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    // Validation
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      Alert.alert("Error", "Please enter a valid email");
      return;
    }

    setIsLoading(true);

    // TODO: Firebase authentication will be implemented here
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to Home screen after successful login
      navigation.navigate("Home");
    }, 1000);
  };

  const handleBackToWelcome = () => {
    navigation.navigate("Welcome");
  };

  const navigateToSignup = () => {
    navigation.navigate("Signup");
  };

  return (
    <LinearGradient
      colors={["#0D1322", "#0A1B36", "#042D45"]}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="light" />

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackToWelcome}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.headerSection}>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Login to continue learning</Text>
            </View>

            <View style={styles.formContainer}>
              {/* Email Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="rgba(224, 225, 221, 0.5)"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="rgba(224, 225, 221, 0.5)"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Forgot Password Link */}
              <TouchableOpacity style={styles.forgotPasswordContainer}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              {/* Login Button */}
              <TouchableOpacity
                style={[
                  styles.loginButton,
                  isLoading && styles.loginButtonDisabled,
                ]}
                onPress={handleLogin}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={["#4895EF", "#4361EE"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.loginButtonGradient}
                >
                  <Text style={styles.loginButtonText}>
                    {isLoading ? "Logging in..." : "Login"}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Sign Up Link */}
              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Don't have an account? </Text>
                <TouchableOpacity onPress={navigateToSignup}>
                  <Text style={styles.signupLink}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(178, 207, 249, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  backButtonText: {
    color: "#E0E1DD",
    top: -2,
    fontSize: 24,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 120,
    paddingBottom: 40,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 50,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: "#E0E1DD",
    textAlign: "center",
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#ffffffff",
    textAlign: "center",
    fontWeight: "500",
    opacity: 0.8,
  },
  formContainer: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E0E1DD",
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    padding: 16,
    fontSize: 16,
    color: "#E0E1DD",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: "#4895EF",
    fontSize: 14,
    fontWeight: "600",
  },
  loginButton: {
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 30,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonGradient: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  dividerText: {
    color: "#E0E1DD",
    fontSize: 14,
    fontWeight: "600",
    marginHorizontal: 15,
    opacity: 0.6,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    color: "#E0E1DD",
    fontSize: 15,
    opacity: 0.8,
  },
  signupLink: {
    color: "#4895EF",
    fontSize: 15,
    fontWeight: "bold",
  },
});
