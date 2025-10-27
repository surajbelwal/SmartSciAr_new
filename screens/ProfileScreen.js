import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../context/AuthContext";

export default function ProfileScreen({ navigation }) {
  const { user, userProfile, logout, updateUserProfile, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name || "");
      setStudentClass(userProfile.class || "");
    }
  }, [userProfile]);

  const handleBack = () => {
    if (isEditing) {
      Alert.alert(
        "Discard Changes?",
        "You have unsaved changes. Are you sure you want to go back?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Discard",
            style: "destructive",
            onPress: () => {
              setIsEditing(false);
              setName(userProfile?.name || "");
              setStudentClass(userProfile?.class || "");
              navigation.goBack();
            },
          },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  const handleSave = async () => {
    // Validation
    if (!name || !studentClass) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (name.trim().length < 2) {
      Alert.alert("Error", "Please enter a valid name");
      return;
    }

    const classNum = parseInt(studentClass);
    if (isNaN(classNum) || classNum < 6 || classNum > 12) {
      Alert.alert("Error", "Please enter a valid class (6-12)");
      return;
    }

    setIsSaving(true);

    const result = await updateUserProfile({
      name: name.trim(),
      class: studentClass,
    });

    setIsSaving(false);

    if (result.success) {
      setIsEditing(false);
      Alert.alert("Success", "Profile updated successfully");
    } else {
      Alert.alert("Error", result.error || "Failed to update profile");
    }
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          const result = await logout();
          if (result.success) {
            navigation.reset({
              index: 0,
              routes: [{ name: "Welcome" }],
            });
          } else {
            Alert.alert("Error", "Failed to logout. Please try again.");
          }
        },
      },
    ]);
  };

  if (loading && !userProfile) {
    return (
      <LinearGradient
        colors={["#0D1322", "#0A1B36", "#042D45"]}
        style={styles.container}
      >
        <SafeAreaView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4895EF" />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </SafeAreaView>
      </LinearGradient>
    );
  }

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
          onPress={handleBack}
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
            <View style={styles.avatarContainer}>
              <LinearGradient
                colors={["#4895EF", "#4CC9F0"]}
                style={styles.avatar}
              >
                <Text style={styles.avatarText}>
                  {name ? name.charAt(0).toUpperCase() : "U"}
                </Text>
              </LinearGradient>
            </View>
            <Text style={styles.title}>
              {isEditing ? "Edit Profile" : "My Profile"}
            </Text>
            <Text style={styles.email}>{user?.email}</Text>
          </View>

          <View style={styles.formContainer}>
            {/* Name Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Full Name</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                placeholder="Enter your full name"
                placeholderTextColor="rgba(224, 225, 221, 0.5)"
                value={name}
                onChangeText={setName}
                editable={isEditing}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>

            {/* Class Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Class</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                placeholder="Enter your class (6-12)"
                placeholderTextColor="rgba(224, 225, 221, 0.5)"
                value={studentClass}
                onChangeText={setStudentClass}
                editable={isEditing}
                keyboardType="number-pad"
                maxLength={2}
              />
            </View>

            {/* Email Field (Read-only) */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Email</Text>
              <TextInput
                style={[styles.input, styles.inputDisabled]}
                value={user?.email || ""}
                editable={false}
              />
              <Text style={styles.fieldHint}>Email cannot be changed</Text>
            </View>

            {/* Account Info */}
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Account Created</Text>
              <Text style={styles.infoValue}>
                {userProfile?.createdAt
                  ? new Date(
                      userProfile.createdAt.seconds * 1000
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Recently"}
              </Text>
            </View>

            {/* Action Buttons */}
            {isEditing ? (
              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => {
                    setIsEditing(false);
                    setName(userProfile?.name || "");
                    setStudentClass(userProfile?.class || "");
                  }}
                  activeOpacity={0.8}
                  disabled={isSaving}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.saveButton]}
                  onPress={handleSave}
                  activeOpacity={0.8}
                  disabled={isSaving}
                >
                  <LinearGradient
                    colors={["#1FCFA6", "#19A485"]}
                    style={styles.buttonGradient}
                  >
                    <Text style={styles.buttonText}>
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => setIsEditing(true)}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={["#4895EF", "#4361EE"]}
                    style={styles.buttonGradient}
                  >
                    <Text style={styles.buttonText}>Edit Profile</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.logoutButton}
                  onPress={handleLogout}
                  activeOpacity={0.8}
                >
                  <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
              </>
            )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#E0E1DD",
    fontSize: 16,
    marginTop: 16,
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
  avatarContainer: {
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  avatarText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#E0E1DD",
    textAlign: "center",
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: "#4CC9F0",
    textAlign: "center",
    fontWeight: "500",
  },
  formContainer: {
    width: "100%",
  },
  fieldContainer: {
    marginBottom: 24,
  },
  fieldLabel: {
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
  inputDisabled: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    opacity: 0.7,
  },
  fieldHint: {
    fontSize: 12,
    color: "rgba(224, 225, 221, 0.6)",
    marginTop: 6,
    marginLeft: 4,
  },
  infoCard: {
    backgroundColor: "rgba(72, 149, 239, 0.1)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "rgba(72, 149, 239, 0.3)",
  },
  infoLabel: {
    fontSize: 14,
    color: "rgba(224, 225, 221, 0.7)",
    marginBottom: 6,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E0E1DD",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  button: {
    flex: 1,
    borderRadius: 15,
    overflow: "hidden",
  },
  cancelButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },
  cancelButtonText: {
    color: "#E0E1DD",
    fontSize: 16,
    fontWeight: "bold",
  },
  saveButton: {
    overflow: "hidden",
  },
  editButton: {
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 16,
  },
  buttonGradient: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "rgba(255, 107, 107, 0.2)",
    borderRadius: 15,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: "rgba(255, 107, 107, 0.5)",
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#FF6B6B",
    fontSize: 16,
    fontWeight: "bold",
  },
});
