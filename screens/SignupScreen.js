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
import { useAuth } from "../context/AuthContext";

export default function SignupScreen({ navigation }) {
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    // Validation
    if (!name || !email || !studentClass || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (name.trim().length < 2) {
      Alert.alert("Error", "Please enter a valid name");
      return;
    }

    if (!email.includes("@")) {
      Alert.alert("Error", "Please enter a valid email");
      return;
    }

    // Validate class (6-12)
    const classNum = parseInt(studentClass);
    if (isNaN(classNum) || classNum < 6 || classNum > 12) {
      Alert.alert("Error", "Please enter a valid class (6-12)");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setIsLoading(true);

    // Firebase signup
    const result = await signup(email, password, name.trim(), studentClass);

    setIsLoading(false);

    if (result.success) {
      Alert.alert("Success!", "Your account has been created successfully", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Home"),
        },
      ]);
    } else {
      Alert.alert("Signup Failed", result.error);
    }
  };

  const handleBackToWelcome = () => {
    navigation.navigate("Welcome");
  };

  const navigateToLogin = () => {
    navigation.navigate("Login");
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
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>
                Sign up to start your learning journey
              </Text>
            </View>

            <View style={styles.formContainer}>
              {/* Name Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  placeholderTextColor="rgba(224, 225, 221, 0.5)"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>

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

              {/* Class Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Class (6-12)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your class (e.g., 9)"
                  placeholderTextColor="rgba(224, 225, 221, 0.5)"
                  value={studentClass}
                  onChangeText={setStudentClass}
                  keyboardType="number-pad"
                  maxLength={2}
                  autoCorrect={false}
                />
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password (min 6 characters)"
                  placeholderTextColor="rgba(224, 225, 221, 0.5)"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Confirm Password Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Confirm Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm your password"
                  placeholderTextColor="rgba(224, 225, 221, 0.5)"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Sign Up Button */}
              <TouchableOpacity
                style={[
                  styles.signupButton,
                  isLoading && styles.signupButtonDisabled,
                ]}
                onPress={handleSignup}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={["#1FCFA6", "#19A485"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.signupButtonGradient}
                >
                  <Text style={styles.signupButtonText}>
                    {isLoading ? "Creating Account..." : "Sign Up"}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Terms and Conditions */}
              <Text style={styles.termsText}>
                By signing up, you agree to our{" "}
                <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>

              {/* Divider */}
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Login Link */}
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <TouchableOpacity onPress={navigateToLogin}>
                  <Text style={styles.loginLink}>Login</Text>
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
    marginBottom: 40,
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
    marginBottom: 20,
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
  signupButton: {
    borderRadius: 15,
    overflow: "hidden",
    marginTop: 10,
    marginBottom: 20,
  },
  signupButtonDisabled: {
    opacity: 0.6,
  },
  signupButtonGradient: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  signupButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  termsText: {
    color: "#E0E1DD",
    fontSize: 12,
    textAlign: "center",
    opacity: 0.7,
    marginBottom: 30,
    paddingHorizontal: 20,
    lineHeight: 18,
  },
  termsLink: {
    color: "#4895EF",
    fontWeight: "600",
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
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    color: "#E0E1DD",
    fontSize: 15,
    opacity: 0.8,
  },
  loginLink: {
    color: "#1FCFA6",
    fontSize: 15,
    fontWeight: "bold",
  },
});
