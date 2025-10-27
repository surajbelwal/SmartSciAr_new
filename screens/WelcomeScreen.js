import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Animated,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function WelcomeScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleGetStarted = () => {
    navigation.navigate("Home");
  };

  const handleLoginPress = () => {
    navigation.navigate("Login");
  };

  const handleSignupPress = () => {
    navigation.navigate("Signup");
  };

  return (
    <LinearGradient
      colors={["#0D1B2A", "#1B263B", "#415A77"]}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="light" />

        {/* Header Section */}
        <Animated.View
          style={[
            styles.headerSection,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <Text style={styles.title}>SMART SCI AR</Text>
          <Text style={styles.subtitle}>Science Learning, Reimagined.</Text>
          <View style={styles.gradeContainer}>
            <Text style={styles.gradeText}>
              Classes 6-12 • Physics • Chemistry • Biology
            </Text>
          </View>
        </Animated.View>

        {/* Welcome Content */}
        <Animated.View style={[styles.contentSection, { opacity: fadeAnim }]}>
          <Text style={styles.welcomeText}>
            Dive into science with Augmented Reality 🧪🧬
          </Text>
          <Text style={styles.descriptionText}>
            Explore complex concepts with interactive 3D models and simulations,
            bringing your textbooks to life.
          </Text>
        </Animated.View>

        {/* Buttons Section */}
        <Animated.View style={[styles.buttonSection, { opacity: fadeAnim }]}>
          {/* Login Button */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLoginPress}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#4895EF", "#4361EE"]}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.buttonText}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Sign Up Button */}
          <TouchableOpacity
            style={styles.signupButton}
            onPress={handleSignupPress}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#1FCFA6", "#19A485"]}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Continue as Guest Button */}
          <TouchableOpacity
            style={styles.guestButton}
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <Text style={styles.guestButtonText}>Continue as Guest</Text>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
  headerSection: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
  },
  title: {
    fontSize: 48,
    fontWeight: "800",
    color: "#E0E1DD",
    textAlign: "center",
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 20,
    color: "#99D98C",
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 20,
  },
  gradeContainer: {
    backgroundColor: "rgba(153, 217, 140, 0.1)",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#99D98C",
    marginTop: 10,
  },
  gradeText: {
    color: "#99D98C",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },
  contentSection: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#E0E1DD",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 32,
  },
  descriptionText: {
    fontSize: 16,
    color: "#C5C7C9",
    textAlign: "center",
    lineHeight: 24,
    fontWeight: "400",
  },
  buttonSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
    width: "100%",
  },
  loginButton: {
    width: width * 0.85,
    height: 56,
    borderRadius: 28,
    overflow: "hidden",
    shadowColor: "#4895EF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
    marginBottom: 16,
  },
  signupButton: {
    width: width * 0.85,
    height: 56,
    borderRadius: 28,
    overflow: "hidden",
    shadowColor: "#1FCFA6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
    marginBottom: 20,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.8,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: width * 0.85,
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(224, 225, 221, 0.3)",
  },
  dividerText: {
    color: "#C5C7C9",
    fontSize: 14,
    fontWeight: "600",
    marginHorizontal: 15,
  },
  guestButton: {
    width: width * 0.85,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 2,
    borderColor: "rgba(224, 225, 221, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  guestButtonText: {
    color: "#E0E1DD",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.8,
  },
});
