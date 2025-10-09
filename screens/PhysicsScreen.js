import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

export default function PhysicsScreen({ navigation }) {
  const physicsTopics = [
    {
      title: "Newton's Cradle",
      modelId: "decoration",
      hasModel: true,
    },
    {
      title: "Reflection & Refraction Prism",
      modelId: "prism",
      hasModel: true,
    },
    {
      title: "Electric Circuit",
      modelId: "figure121",
      hasModel: true,
    },
    {
      title: "Refraction of Light",
      modelId: "figure1010",
      hasModel: true,
    },
    {
      title: "Concave and Convex Mirror",
      modelId: "figure102",
      hasModel: true,
    },
    {
      title: "Parallel Rays Through Concave Mirror",
      modelId: "figure103",
      hasModel: true,
    },
    {
      title: "Focal Ray Reflection in Mirrors",
      modelId: "figure104",
      hasModel: true,
    },
    {
      title: "Center of Curvature Ray Reflection",
      modelId: "figure105",
      hasModel: true,
    },
    {
      title: "Oblique Ray Reflection at Mirror Pole",
      modelId: "figure106",
      hasModel: true,
    },
    {
      title: "Ray Diagrams for Concave Mirror Image Formation",
      modelId: "figure107",
      hasModel: true,
    },
    {
      title: "Formation of Image by a Convex Mirror",
      modelId: "figure108",
      hasModel: true,
    },
    {
      title: "The New Cartesian Sign Convention for Spherical Mirrors",
      modelId: "figure109",
      hasModel: true,
    },
    {
      title: "Refraction of Light by Glass",
      modelId: "figure1011",
      hasModel: true,
    },
    {
      title: "Converging and Diverging Action of Lenses",
      modelId: "figure1012",
      hasModel: true,
    },
    {
      title: "Principal Axis Ray Refraction in Lenses",
      modelId: "figure1013",
      hasModel: true,
    },
    {
      title: "Focal Ray Refraction in Lenses",
      modelId: "figure1014",
      hasModel: true,
    },
    {
      title: "Ray Through Optical Center of Lens",
      modelId: "figure1015",
      hasModel: true,
    },
    {
      title: "Image Formation by Convex Lens for Various Object Positions",
      modelId: "figure1016",
      hasModel: true,
    },
    {
      title: "Image Formation by Concave Lens",
      modelId: "figure1017",
      hasModel: true,
    },
    {
      title: "Electrical Conductivity of Metals",
      modelId: "figure32",
      hasModel: true,
    },
    {
      title: "The Human Eye",
      modelId: "figure111",
      hasModel: true,
    },
    {
      title: "Myopia and Its Correction with Concave Lens",
      modelId: "figure112",
      hasModel: true,
    },
    {
      title: "Hypermetropia and Its Correction with Convex Lens",
      modelId: "figure113",
      hasModel: true,
    },
    {
      title: "Refraction of Light Through a Triangular Glass Prism",
      modelId: "figure114",
      hasModel: true,
    },
    {
      title: "Dispersion of White Light by the Glass Prism",
      modelId: "figure115",
      hasModel: true,
    },
    {
      title: "Recombination of the Spectrum of White Light",
      modelId: "figure116",
      hasModel: true,
    },
    {
      title: "Rainbow Formation",
      modelId: "figure118",
      hasModel: true,
    },
    {
      title: "Observing Scattering of Light in Colloidal Solution",
      modelId: "figure1111",
      hasModel: true,
    },
  ];

  const handleBackToHome = () => {
    navigation.navigate("Home");
  };

  const handleTopicPress = (topic) => {
    if (topic.hasModel && topic.modelId) {
      navigation.navigate("PhysicsModel", { modelId: topic.modelId });
    }
  };

  return (
    <LinearGradient
      colors={["#0D1322", "#08101C", "#031525"]}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="light" />

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackToHome}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerSection}>
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>⚛️</Text>
            </View>
            <Text style={styles.title}>PHYSICS</Text>
            <Text style={styles.subtitle}>
              Dive into the fundamental laws of the universe
            </Text>
          </View>

          <View style={styles.topicsSection}>
            {physicsTopics.map((topic, index) => (
              <TouchableOpacity
                key={index}
                style={styles.topicCardWrapper}
                activeOpacity={0.8}
                onPress={() => handleTopicPress(topic)}
              >
                <LinearGradient
                  colors={["rgba(68, 123, 222, 0.15)", "rgba(68, 123, 222, 0.05)"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.topicCard}
                >
                  <View style={styles.topicInfo}>
                    <View style={styles.topicNumber}>
                      <Text style={styles.topicNumberText}>{index + 1}</Text>
                    </View>
                    <View style={styles.topicContent}>
                      <Text style={styles.topicTitle}>{topic.title}</Text>
                      <Text style={styles.topicSubtitle}>
                        3D model available • Tap to explore
                      </Text>
                    </View>
                  </View>
                  <LinearGradient
                    colors={["#4895EF", "#4CC9F0"]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.exploreButton}
                  >
                    <Text style={styles.exploreButtonText}>Explore</Text>
                  </LinearGradient>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
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
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  backButtonText: {
    color: "#E0E1DD",
    fontSize: 24,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 100,
    paddingBottom: 40,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: "rgba(68, 123, 222, 0.2)",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#4895EF",
  },
  iconText: {
    fontSize: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#E0E1DD",
    textAlign: "center",
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#a6e4ffff",
    textAlign: "center",
    fontWeight: "600",
  },
  topicsSection: {
    marginBottom: 30,
  },
  topicCardWrapper: {
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 20,
  },
  topicCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topicInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  topicNumber: {
    width: 32,
    height: 32,
    backgroundColor: "#4895EF",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  topicNumberText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  topicContent: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E0E1DD",
    marginBottom: 4,
  },
  topicSubtitle: {
    fontSize: 12,
    color: "#C5C7C9",
  },
  exploreButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  exploreButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});