import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { WebView } from "react-native-webview";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const ARModelViewer = ({ modelData, navigation }) => {
  const { title } = modelData;

  const [permission, requestPermission] = useCameraPermissions();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // simulate AR model load
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  if (!permission) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4ecdc4" />
        <Text style={styles.message}>Checking camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.centered}>
        <Ionicons name="camera" size={40} color="#4ecdc4" />
        <Text style={styles.message}>Camera access required</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: "#ff6b6b" }]} onPress={handleBack}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Camera Background */}
      <CameraView style={styles.camera} facing="back" />

      {/* AR Model Overlay */}
      <View style={styles.modelOverlay}>
        {!isLoading ? (
          <Animatable.View animation="fadeIn" duration={800}>
            <WebView
              style={styles.modelViewer}
              source={{
                uri: `${modelData.embedUrl}?autostart=1&transparent=1&ui_controls=0&ui_infos=0&ui_stop=0&ui_inspector=0&ui_watermark=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0`,
              }}
              allowsInlineMediaPlayback
              javaScriptEnabled
              domStorageEnabled
              startInLoadingState={false}
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              backgroundColor="transparent"
              mixedContentMode="compatibility"
            />
          </Animatable.View>
        ) : (
          <Animatable.View
            animation="fadeIn"
            style={styles.loadingContainer}
          >
            <ActivityIndicator size="large" color="#4ecdc4" />
            <Text style={styles.loadingText}>Loading AR Model...</Text>
          </Animatable.View>
        )}
      </View>

      {/* UI Controls */}
      <SafeAreaView style={styles.ui}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        {/* Info Card */}
        {!isLoading && (
          <Animatable.View
            // animation="slideUp"
            duration={800}
            delay={300}
            style={styles.infoCard}
          >
            <Text style={styles.infoTitle}>✨ AR Model</Text>
            <Text style={styles.infoText}>
              You’re viewing a 3D <Text style={{ fontWeight: "bold" }}>{title}</Text> in AR.
              Move your phone to see it blend into your real environment.
            </Text>
          </Animatable.View>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    padding: 20,
  },
  camera: { flex: 1 },
  modelOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  modelViewer: {
    width: width - 40,
    height: height - 220,
    backgroundColor: "transparent",
    borderRadius: 12,
    overflow: "hidden",
  },
  ui: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "box-none",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    elevation: 5,
  },
  loadingContainer: {
    alignItems: "center",
    padding: 20,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  loadingText: {
    color: "#4ecdc4",
    fontSize: 15,
    fontWeight: "600",
    marginTop: 8,
    textAlign: "center",
  },
  infoCard: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: "rgba(255,255,255,0.08)",
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(78,205,196,0.5)",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    backdropFilter: "blur(12px)",
  },
  infoTitle: {
    color: "#4ecdc4",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  infoText: {
    color: "white",
    fontSize: 14,
    lineHeight: 20,
  },
  message: {
    color: "white",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4ecdc4",
    padding: 14,
    borderRadius: 10,
    marginTop: 15,
    minWidth: 180,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default ARModelViewer;
