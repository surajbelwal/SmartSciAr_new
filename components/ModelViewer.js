import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { WebView } from "react-native-webview";

const { width } = Dimensions.get("window");

const ModelViewer = ({ modelData, navigation }) => {
  const { embedUrl, title, description } = modelData;
  const [isLoading, setIsLoading] = useState(true);
  const [showDescription, setShowDescription] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

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
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    if (isLoading) {
      pulseAnimation.start();
    } else {
      pulseAnimation.stop();
    }

    return () => pulseAnimation.stop();
  }, [isLoading]);

  const handleBack = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -50,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.goBack();
    });
  };

  const handleWebViewLoad = () => {
    setIsLoading(false);
    setTimeout(() => {
      setShowDescription(true);
    }, 1000);
  };

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Animated Background */}
      <Animated.View style={[styles.backgroundGradient, { opacity: fadeAnim }]} />

      {/* Back Button */}
      <Animated.View
        style={[
          styles.backArrowContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.backArrow}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Text style={styles.backArrowText}>←</Text>
        </TouchableOpacity>
      </Animated.View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Animated.View
          style={[
            styles.titleContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
            },
          ]}
        >
          <Text style={styles.title}>{title}</Text>
          <View style={styles.titleUnderline} />
        </Animated.View>

        {/* Model Viewer */}
        <Animated.View
          style={[
            styles.modelContainer,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: isLoading ? pulseAnim : scaleAnim },
              ],
            },
          ]}
        >
          {isLoading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#00f5d4" />
              <Text style={styles.loadingText}>Preparing Model...</Text>
              <View style={styles.loadingBar}>
                <Animated.View
                  style={[
                    styles.loadingProgress,
                    {
                      transform: [{ scaleX: pulseAnim }],
                    },
                  ]}
                />
              </View>
            </View>
          )}

          <WebView
            source={{ uri: embedUrl }}
            style={styles.modelFrame}
            allowsFullscreenVideo={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            scalesPageToFit={true}
            onLoad={handleWebViewLoad}
            onLoadEnd={handleWebViewLoad}
          />
        </Animated.View>

        {/* Toggle Description */}
        <Animated.View
          style={[
            styles.descriptionToggle,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={toggleDescription}
            activeOpacity={0.8}
          >
            <Text style={styles.toggleButtonText}>
              {showDescription ? "Hide Details" : "Show Details"}
            </Text>
            <Animated.Text
              style={[
                styles.toggleArrow,
                {
                  transform: [
                    {
                      rotate: showDescription ? "180deg" : "0deg",
                    },
                  ],
                },
              ]}
            >
              ▼
            </Animated.Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Ask AI */}
        <Animated.View
          style={[
            styles.aiButtonContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.aiButton}
            onPress={() =>
              navigation.navigate("AIChat", {
                topicTitle: title,
                topicDescription: description.join(" "),
              })
            }
            activeOpacity={0.85}
          >
            <View style={styles.aiButtonGlow} />
            <Text style={styles.aiButtonIcon}>🤖</Text>
            <Text style={styles.aiButtonText}>Ask AI</Text>
            <Text style={styles.aiButtonSubtext}>Smart instant answers</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Description */}
        {showDescription && (
          <Animated.View
            style={[
              styles.descriptionContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.descriptionHeader}>
              <Text style={styles.descriptionTitle}>Key Insights</Text>
              <View style={styles.descriptionIcon}>
                <Text style={styles.iconText}>✨</Text>
              </View>
            </View>

            {description.map((point, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.pointContainer,
                  {
                    opacity: fadeAnim,
                    transform: [
                      {
                        translateX: slideAnim.interpolate({
                          inputRange: [0, 50],
                          outputRange: [0, -20],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <View style={styles.pointBullet} />
                <Text style={styles.descriptionPoint}>{point}</Text>
              </Animated.View>
            ))}
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050510",
  },
  backgroundGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 400,
    backgroundColor: "transparent",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    shadowColor: "#00f5d4",
    shadowOpacity: 0.4,
    shadowRadius: 40,
  },
  backArrowContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 100,
  },
  backArrow: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0, 245, 212, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#00f5d4",
    shadowColor: "#00f5d4",
    shadowOpacity: 0.7,
    shadowRadius: 12,
  },
  backArrowText: {
    color: "#00f5d4",
    fontSize: 22,
    fontWeight: "700",
  },
  scrollView: {
    flex: 1,
    zIndex: 2,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 120,
    paddingBottom: 50,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 34,
    fontWeight: "900",
    color: "#ffffff",
    textAlign: "center",
    textShadowColor: "#00f5d4",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
    letterSpacing: 1.5,
  },
  titleUnderline: {
    width: 70,
    height: 4,
    backgroundColor: "#00f5d4",
    marginTop: 10,
    borderRadius: 3,
    shadowColor: "#00f5d4",
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  modelContainer: {
    width: "100%",
    height: 460,
    marginBottom: 30,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: "rgba(0,245,212,0.3)",
    shadowColor: "#00f5d4",
    shadowOpacity: 0.3,
    shadowRadius: 25,
    elevation: 12,
  },
  modelFrame: {
    width: "100%",
    height: "100%",
    borderRadius: 24,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(5,5,20,0.92)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    borderRadius: 24,
  },
  loadingText: {
    color: "#00f5d4",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 15,
    letterSpacing: 1,
  },
  loadingBar: {
    width: 200,
    height: 5,
    backgroundColor: "rgba(0,245,212,0.15)",
    borderRadius: 3,
    marginTop: 20,
    overflow: "hidden",
  },
  loadingProgress: {
    height: "100%",
    backgroundColor: "#00f5d4",
    borderRadius: 3,
  },
  descriptionToggle: {
    marginBottom: 20,
  },
  toggleButton: {
    backgroundColor: "rgba(0,245,212,0.1)",
    borderRadius: 16,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0,245,212,0.25)",
  },
  toggleButtonText: {
    color: "#00f5d4",
    fontSize: 18,
    fontWeight: "600",
  },
  toggleArrow: {
    color: "#00f5d4",
    fontSize: 18,
    fontWeight: "bold",
  },
  descriptionContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 20,
    padding: 25,
    borderWidth: 1,
    borderColor: "rgba(0,245,212,0.25)",
  },
  descriptionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#00f5d4",
    letterSpacing: 1,
  },
  descriptionIcon: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(0,245,212,0.15)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#00f5d4",
  },
  iconText: {
    fontSize: 20,
  },
  pointContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15,
    paddingLeft: 5,
  },
  pointBullet: {
    width: 8,
    height: 8,
    backgroundColor: "#00f5d4",
    borderRadius: 4,
    marginRight: 12,
    marginTop: 7,
  },
  descriptionPoint: {
    fontSize: 16,
    lineHeight: 24,
    color: "#ffffff",
    flex: 1,
  },
  aiButtonContainer: {
    marginBottom: 25,
  },
  aiButton: {
    backgroundColor: "rgba(0,245,212,0.1)",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#00f5d4",
    position: "relative",
    shadowColor: "#00f5d4",
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  aiButtonGlow: {
    position: "absolute",
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(0,245,212,0.4)",
  },
  aiButtonIcon: {
    fontSize: 30,
    marginBottom: 8,
  },
  aiButtonText: {
    color: "#00f5d4",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  aiButtonSubtext: {
    color: "rgba(0,245,212,0.7)",
    fontSize: 14,
    fontWeight: "400",
  },
});

export default ModelViewer;
