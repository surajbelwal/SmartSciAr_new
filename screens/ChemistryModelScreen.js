import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native"; // Assuming "react-native" is available externally
import { StatusBar } from "expo-status-bar"; // Assuming "expo-status-bar" is available externally
import { LinearGradient } from "expo-linear-gradient"; // Assuming "expo-linear-gradient" is available externally
import ModelViewer from "../components/ModelViewer"; // Assuming component paths are correct
import ARModelViewer from "../components/ARModelViewer"; // Assuming component paths are correct
import { getModelById } from "../data/chemistryData"; // Assuming data path is correct

// --- Theme Colors for Chemistry (Green/Cyan) ---
const CHEMISTRY_ACCENT_GRADIENT = ["#4ECDC4", "#8DECB4"]; // Vibrant Cyan/Green
const INACTIVE_ACCENT_GRADIENT = ["rgba(78, 205, 196, 0.3)", "rgba(141, 236, 180, 0.3)"]; // Subtle Cyan/Green
const BG_GRADIENT = ["#0D1322", "#08101C", "#031525"]; // Deep Dark Background

export default function ChemistryModelScreen({ route, navigation }) {
  const { modelId } = route.params;
  const modelData = getModelById(modelId);
  const [isARMode, setIsARMode] = useState(false);

  const hasARSupport = true; 

  const handleBack = () => {
    navigation.goBack();
  };

  if (!modelData) {
    return (
      <LinearGradient
        colors={BG_GRADIENT}
        style={styles.container}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar style="light" />
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <View style={styles.errorContainer}>
            <Text style={styles.errorTitle}>Model not found</Text>
            <Text style={styles.errorText}>
              Please go back and select another topic.
            </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={BG_GRADIENT}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="light" />

        {/* Universal Back Button (Top Left) */}
        {/* <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity> */}

        {/* AR Toggle Button (Top Right) */}
        {hasARSupport && (
          <TouchableOpacity
            style={styles.arToggleButton}
            onPress={() => setIsARMode(!isARMode)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={isARMode ? CHEMISTRY_ACCENT_GRADIENT : INACTIVE_ACCENT_GRADIENT}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.arToggleGradient}
            >
              <Text style={styles.arToggleText}>
                {isARMode ? "📱 3D View" : "🥽 AR Mode"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}

        {/* Conditional Rendering: Model View */}
        {isARMode ? (
          <ARModelViewer modelData={modelData} navigation={navigation} />
        ) : (
          <ModelViewer modelData={modelData} navigation={navigation} />
        )}
      
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#E0E1DD",
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: "#C5C7C9",
    textAlign: "center",
  },
  // Universal Top-Left Back Button Style
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  backButtonText: {
    color: "#E0E1DD",
    fontSize: 24,
    fontWeight: "bold",
  },
  // Universal Top-Right AR Toggle Button Style
  arToggleButton: {
    position: "absolute",
    top: 60,
    right: 20,
    zIndex: 100,
    borderRadius: 20,
    // Strong shadow effect for "floating" look
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 15,
  },
  arToggleGradient: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  arToggleText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});
