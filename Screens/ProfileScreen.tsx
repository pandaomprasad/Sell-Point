import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const SECTIONS = [
  { id: 'listings', title: 'My Listings', icon: 'format-list-bulleted', count: 12 },
  { id: 'favorites', title: 'Favorites', icon: 'heart-outline', count: 8 },
  { id: 'messages', title: 'Messages', icon: 'message-outline', count: 3 },
  { id: 'settings', title: 'Settings', icon: 'cog-outline',count:undefined },
  { id: 'privacypolicy', title: 'Privacy Policy', icon: 'shield-account-variant-outline',count:undefined },
  { id: 'termsandconditions', title: 'Terms & Conditions', icon: 'file-document-multiple-outline',count:undefined },
] as const;

type Section = (typeof SECTIONS)[number];

export default function ProfileScreen() {
  const handleEditProfile = () => {
    console.log('Edit Profile');
  };

  const handleLogout = () => {
    console.log('Logout');
  };

  const handleSectionPress = (sectionId: string) => {
    console.log(`Navigate to ${sectionId}`);
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={['#4A90E2', '#357ABD']} style={styles.header}>
        <View style={styles.profileContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: 'https://api.a0.dev/assets/image?text=profile%20photo&aspect=1:1',
              }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editImageButton} onPress={handleEditProfile}>
              <MaterialCommunityIcons name="camera" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>Alex Johnson</Text>
          <Text style={styles.location}>
            <Ionicons name="location-outline" size={16} color="white" /> New York, USA
          </Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.sections}>
        {SECTIONS.map((section) => (
          <TouchableOpacity
            key={section.id}
            style={styles.section}
            onPress={() => handleSectionPress(section.id)}>
            <View style={styles.sectionContent}>
              <View style={styles.sectionLeft}>
                <MaterialCommunityIcons
                  name={section.icon as keyof typeof MaterialCommunityIcons.glyphMap}
                  size={24}
                  color="#4A90E2"
                />
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>
              <View style={styles.sectionRight}>
                {section.count !== undefined && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{section.count}</Text>
                  </View>
                )}
                <MaterialCommunityIcons name="chevron-right" size={24} color="#CCC" />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <MaterialCommunityIcons name="logout" size={20} color="#FF4444" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { paddingTop: 60, paddingBottom: 30, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  profileContainer: { alignItems: 'center' },
  imageContainer: { position: 'relative' },
  profileImage: { width: 120, height: 120, borderRadius: 60, borderWidth: 4, borderColor: 'white' },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4A90E2',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  name: { fontSize: 24, fontWeight: 'bold', color: 'white', marginTop: 12 },
  location: { fontSize: 16, color: 'white', marginTop: 4, opacity: 0.9 },
  editButton: { backgroundColor: 'rgba(255, 255, 255, 0.2)', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, marginTop: 16 },
  editButtonText: { color: 'white', fontSize: 16, fontWeight: '500' },
  sections: { backgroundColor: 'white', margin: 16, borderRadius: 12, elevation: 3 },
  section: { paddingVertical: 16, paddingHorizontal: 20 },
  sectionContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionLeft: { flexDirection: 'row', alignItems: 'center' },
  sectionTitle: { fontSize: 16, marginLeft: 12, color: '#333' },
  sectionRight: { flexDirection: 'row', alignItems: 'center' },
  badge: { backgroundColor: '#4A90E2', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 4, marginRight: 8 },
  badgeText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', margin: 16, padding: 16, borderRadius: 12, elevation: 3 },
  logoutText: { color: '#FF4444', fontSize: 16, fontWeight: '500', marginLeft: 8 },
});

// I fixed the icon type issue! Icons are now properly typed and won’t cause TS errors. 🚀
