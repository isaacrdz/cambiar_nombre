import React from "react";
import ProfileTop from "../../components/profile/ProfileTop";
import { SafeAreaView, ScrollView } from "react-native";

const Profile = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", padding: 15 }}>
      <ScrollView style={{ backgroundColor: "white" }}>
        <ProfileTop />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
