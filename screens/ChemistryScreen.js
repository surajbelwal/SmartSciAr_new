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

export default function ChemistryScreen({ navigation }) {
  const chemistryTopics = [
    {
      title: "Atomic Structure & Periodic Table",
      modelId: "atom",
      hasModel: true,
    },
    {
      title: "Atomic Models & Theory",
      modelId: "atomicModel",
      hasModel: true,
    },
    {
      title: "Periodic Table of Elements",
      modelId: "periodicTable",
      hasModel: true,
    },
    {
      title: "Water Molecule (H₂O)",
      modelId: "water",
      hasModel: true,
    },
    {
      title: "Water Ball-and-Stick Model",
      modelId: "waterBallStick",
      hasModel: true,
    },
    {
      title: "Liquid Water Structure",
      modelId: "liquidWater",
      hasModel: true,
    },
    {
      title: "Benzene - Aromatic Compounds",
      modelId: "benzene",
      hasModel: true,
    },
    {
      title: "Molecular Structure & Bonding",
      modelId: "molecule",
      hasModel: true,
    },
    {
      title: "Carbon Dioxide (CO₂)",
      modelId: "carbonDioxide",
      hasModel: true,
    },
    {
      title: "Glucose - Carbohydrates",
      modelId: "glucose",
      hasModel: true,
    },
    {
      title: "Methane (CH₄) - Alkanes",
      modelId: "methane",
      hasModel: true,
    },
    {
      title: "Ethane Molecule",
      modelId: "ethane",
      hasModel: true,
    },
    {
      title: "Diamond Crystal Structure",
      modelId: "diamond",
      hasModel: true,
    },
    {
      title: "F Orbital - Quantum Chemistry",
      modelId: "orbitalF",
      hasModel: true,
    },
    {
      title: "Dxz Orbital - Transition Metals",
      modelId: "orbitalDxz",
      hasModel: true,
    },
    {
      title: "Cyclohexane Chair Conformation",
      modelId: "cyclohexane",
      hasModel: true,
    },
    {
      title: "Dopamine - Neurotransmitters",
      modelId: "dopamine",
      hasModel: true,
    },
    {
      title: "Phenol - Aromatic Alcohols",
      modelId: "phenol",
      hasModel: true,
    },
    {
      title: "Sodium Chloride (NaCl)",
      modelId: "nacl",
      hasModel: true,
    },
    { title: "Chemical Equilibrium", modelId: null, hasModel: false },
    { title: "Thermochemistry", modelId: null, hasModel: false },
    { title: "Electrochemistry", modelId: null, hasModel: false },
  ];

  const handleBackToHome = () => {
    navigation.navigate("Home");
  };

  const handleTopicPress = (topic) => {
    if (topic.hasModel && topic.modelId) {
      navigation.navigate("ChemistryModel", { modelId: topic.modelId });
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
              <Text style={styles.iconText}>🧪</Text>
            </View>
            <Text style={styles.title}>Chemistry</Text>
            <Text style={styles.subtitle}>
              Discover the world of molecules and reactions
            </Text>
          </View>

          <View style={styles.topicsSection}>
            {chemistryTopics.map((topic, index) => (
              <TouchableOpacity
                key={index}
                style={styles.topicCardWrapper}
                activeOpacity={0.8}
                onPress={() => handleTopicPress(topic)}
              >
                <LinearGradient
                  colors={topic.hasModel ? ["rgba(100, 255, 218, 0.15)", "rgba(100, 255, 218, 0.05)"] : ["rgba(255, 255, 255, 0.05)", "rgba(255, 255, 255, 0.02)"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[styles.topicCard, !topic.hasModel && styles.topicCardDisabled]}
                >
                  <View style={styles.topicInfo}>
                    <View style={[styles.topicNumber, topic.hasModel ? styles.topicNumberActive : null]}>
                      <Text style={styles.topicNumberText}>{index + 1}</Text>
                    </View>
                    <View style={styles.topicContent}>
                      <Text style={[styles.topicTitle, !topic.hasModel && styles.topicTitleDisabled]}>{topic.title}</Text>
                      <Text style={[styles.topicSubtitle, !topic.hasModel && styles.topicSubtitleDisabled]}>
                        {topic.hasModel ? "3D model available • Tap to explore" : "Coming soon..."}
                      </Text>
                    </View>
                  </View>
                  {topic.hasModel && (
                    <LinearGradient
                      colors={["#4ECDC4", "#8DECB4"]}
                      start={{ x: 0, y: 0.5 }}
                      end={{ x: 1, y: 0.5 }}
                      style={styles.exploreButton}
                    >
                      <Text style={styles.exploreButtonText}>Explore</Text>
                    </LinearGradient>
                  )}
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
    backgroundColor: "rgba(78, 205, 196, 0.2)",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#4ECDC4",
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
    color: "#a6ff94ff",
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
  topicCardDisabled: {
    borderColor: "rgba(255, 255, 255, 0.05)",
    shadowOpacity: 0,
    elevation: 0,
  },
  topicInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  topicNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  topicNumberActive: {
    backgroundColor: "#4ECDC4",
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
  topicTitleDisabled: {
    color: "#6C757D",
  },
  topicSubtitle: {
    fontSize: 12,
    color: "#C5C7C9",
  },
  topicSubtitleDisabled: {
    color: "#6C757D",
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