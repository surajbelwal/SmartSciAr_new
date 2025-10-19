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
import { useAuth } from "../context/AuthContext";

export default function HomeScreen({ navigation }) {
  const { user, userProfile } = useAuth();
  const handlePhysicsPress = () => {
    navigation.navigate("Physics");
  };

  const handleChemistryPress = () => {
    navigation.navigate("Chemistry");
  };

  const handleBiologyPress = () => {
    navigation.navigate("Biology");
  };

  const handleBackToWelcome = () => {
    navigation.navigate("Welcome");
  };

  const handleProfilePress = () => {
    navigation.navigate("Profile");
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

        {/* Profile Button - Only show if user is logged in */}
        {user && (
          <TouchableOpacity
            style={styles.profileButton}
            onPress={handleProfilePress}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={["#4895EF", "#4CC9F0"]}
              style={styles.profileButtonGradient}
            >
              <Text style={styles.profileButtonText}>
                {userProfile?.name
                  ? userProfile.name.charAt(0).toUpperCase()
                  : "U"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerSection}>
            <Text style={styles.title}>Explore Subjects</Text>
            <Text style={styles.subtitle}>
              Ready for a new kind of learning?
            </Text>
          </View>

          <View style={styles.mainContent}>
            {/* Physics Card */}
            <TouchableOpacity
              style={styles.subjectCard}
              activeOpacity={0.8}
              onPress={handlePhysicsPress}
            >
              <LinearGradient
                colors={["rgba(68, 123, 222, 0.15)", "rgba(67, 133, 255, 1)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cardInner}
              >
                <View style={styles.cardHeader}>
                  <View style={[styles.cardIcon, styles.physicsIconBg]}>
                    <Text style={styles.iconText}>⚛️</Text>
                  </View>
                  <Text style={styles.cardTitle}>Physics</Text>
                </View>
                <Text style={styles.cardDescription}>
                  Explore atoms, forces, and quantum mechanics with interactive
                  AR models.
                </Text>
                <View style={[styles.cardButton, styles.physicsButton]}>
                  <Text style={styles.cardButtonText}>Start Learning</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            {/* Chemistry Card */}
            <TouchableOpacity
              style={styles.subjectCard}
              activeOpacity={0.8}
              onPress={handleChemistryPress}
            >
              <LinearGradient
                colors={["rgba(100, 255, 218, 0.15)", "rgba(31, 207, 166, 1)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cardInner}
              >
                <View style={styles.cardHeader}>
                  <View style={[styles.cardIcon, styles.chemistryIconBg]}>
                    <Text style={styles.iconText}>🧪</Text>
                  </View>
                  <Text style={styles.cardTitle}>Chemistry</Text>
                </View>
                <Text style={styles.cardDescription}>
                  Visualize molecules, chemical bonds, and reactions in a
                  virtual lab.
                </Text>
                <View style={[styles.cardButton, styles.chemistryButton]}>
                  <Text style={styles.cardButtonText}>Start Learning</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            {/* Biology Card */}
            <TouchableOpacity
              style={styles.subjectCard}
              activeOpacity={0.8}
              onPress={handleBiologyPress}
            >
              <LinearGradient
                colors={[
                  "rgba(255, 107, 107, 0.15)",
                  "rgba(255, 26, 26, 0.78)",
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cardInner}
              >
                <View style={styles.cardHeader}>
                  <View style={[styles.cardIcon, styles.biologyIconBg]}>
                    <Text style={styles.iconText}>🧬</Text>
                  </View>
                  <Text style={styles.cardTitle}>Biology</Text>
                </View>
                <Text style={styles.cardDescription}>
                  Study cell structures, human anatomy, and ecosystems up close.
                </Text>
                <View style={[styles.cardButton, styles.biologyButton]}>
                  <Text style={styles.cardButtonText}>Start Learning</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
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
  profileButton: {
    position: "absolute",
    top: 60,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: "hidden",
    zIndex: 10,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
    shadowColor: "#4895EF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  profileButtonGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
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
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#E0E1DD",
    textAlign: "center",
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#ffffffff",
    textAlign: "center",
    fontWeight: "500",
  },
  mainContent: {
    paddingHorizontal: 5,
  },
  subjectCard: {
    marginBottom: 25,
    borderRadius: 25,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 20,
  },
  cardInner: {
    padding: 24,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  cardIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  physicsIconBg: {
    backgroundColor: "rgba(68, 123, 222, 0.2)",
  },
  chemistryIconBg: {
    backgroundColor: "rgba(100, 255, 218, 0.2)",
  },
  biologyIconBg: {
    backgroundColor: "rgba(255, 107, 107, 0.2)",
  },
  iconText: {
    fontSize: 32,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ffffffff",
  },
  cardDescription: {
    fontSize: 15,
    color: "#ffffffff",
    lineHeight: 22,
    marginBottom: 20,
  },
  cardButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    alignSelf: "flex-start",
  },
  physicsButton: {
    backgroundColor: "#4895EF",
  },
  chemistryButton: {
    backgroundColor: "#4CC9F0",
  },
  biologyButton: {
    backgroundColor: "#FF6B6B",
  },
  cardButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
});
