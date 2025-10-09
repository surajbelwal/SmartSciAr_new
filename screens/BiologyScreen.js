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

export default function BiologyScreen({ navigation }) {
  const biologyTopics = [
    {
      title: "Cell Model - Basic Structure",
      modelId: "cellModel",
      hasModel: true,
    },
    { title: "Plant Cell Structure", modelId: "plantCell", hasModel: true },
    { title: "Animal Cell Structure", modelId: "animalCell", hasModel: true },
    { title: "Human Cell", modelId: "humanCell", hasModel: true },
    { title: "Prokaryotic Cell", modelId: "prokaryoteCell", hasModel: true },
    { title: "Neuron Structure", modelId: "neuron", hasModel: true },
    { title: "DNA & RNA Structure", modelId: "dnaRna", hasModel: true },
    { title: "Human Heart", modelId: "humanHeart", hasModel: true },
    { title: "Human Brain Structure", modelId: "humanBrain", hasModel: true },
    { title: "Human Eye Structure", modelId: "humanEye", hasModel: true },
    { title: "Human Skull", modelId: "humanSkull", hasModel: true },
    { title: "Human Skeleton", modelId: "skeleton", hasModel: true },
    { title: "Digestive System", modelId: "digestiveSystem", hasModel: true },
    { title: "Excretory System", modelId: "excretorySystem", hasModel: true },
    { title: "Heart and Lungs", modelId: "heartLungs", hasModel: true },
    { title: "Coronavirus (COVID-19)", modelId: "coronavirus", hasModel: true },
    {
      title: "Female Muscular System",
      modelId: "femaleMuscular",
      hasModel: true,
    },
    { title: "Cervical Vertebra", modelId: "cervicalVertebra", hasModel: true },
    { title: "Python Skull", modelId: "pythonSkull", hasModel: true },
  ];

  const handleBackToHome = () => {
    navigation.navigate("Home");
  };

  const handleTopicPress = (topic) => {
    if (topic.hasModel) {
      navigation.navigate("BiologyModel", { modelId: topic.modelId });
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
              <Text style={styles.iconText}>🧬</Text>
            </View>
            <Text style={styles.title}>Biology</Text>
            <Text style={styles.subtitle}>
              Explore the fascinating world of life
            </Text>
          </View>

          <View style={styles.topicsSection}>
            {biologyTopics.map((topic, index) => (
              <TouchableOpacity
                key={index}
                style={styles.topicCardWrapper}
                activeOpacity={0.8}
                onPress={() => handleTopicPress(topic)}
              >
                <LinearGradient
                  colors={["rgba(255, 107, 107, 0.15)", "rgba(255, 107, 107, 0.05)"]}
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
                        3D biological models
                      </Text>
                    </View>
                  </View>
                  <LinearGradient
                    colors={["#FF6B6B", "#FF9B6B"]}
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
    backgroundColor: "rgba(255, 107, 107, 0.2)",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#FF6B6B",
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
    color: "#99D98C",
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
    backgroundColor: "#FF6B6B",
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