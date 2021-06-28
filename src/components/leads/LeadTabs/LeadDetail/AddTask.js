import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import {
  Layout,
  Divider,
  Text,
  Button,
  Icon,
  CheckBox,
  IndexPath,
  Select,
  SelectItem,
  Calendar,
  Input,
} from "@ui-kitten/components";
import Ionicons from "@expo/vector-icons/Ionicons";

const AddTask = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const [date, setDate] = React.useState(new Date());

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <Layout
          style={{
            flex: 1,
            paddingHorizontal: 15,
            paddingVertical: 10,
          }}
        >
          <Text style={styles.text} category="h3">
            Add Task
          </Text>

          <Divider style={{ marginBottom: 25 }} />

          <Layout style={{ marginBottom: 30 }}>
            <Text
              style={styles.text}
              category="s1"
              style={{ marginBottom: 20 }}
            >
              1. Leave a comment
            </Text>
            <Layout
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <Input
                multiline={true}
                placeholder="Multiline"
                textStyle={{ minHeight: 64 }}
                style={{ minWidth: 400 }}
              />
            </Layout>
          </Layout>
          <Layout style={{ marginBottom: 30 }}>
            <Text
              style={styles.text}
              category="s1"
              style={{ marginBottom: 20 }}
            >
              2. Choose an action
            </Text>
            <Layout
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-around",
              }}
            >
              <CheckBox status="primary">
                {" "}
                <Ionicons name="logo-whatsapp" size={20} />
              </CheckBox>
              <CheckBox status="primary">
                <Ionicons name="call-outline" size={20} />
              </CheckBox>
              <CheckBox status="primary">
                <Ionicons name="document-outline" size={20} />
              </CheckBox>
            </Layout>
          </Layout>

          <Layout>
            <Text
              style={styles.text}
              category="s1"
              style={{ marginBottom: 20 }}
            >
              3. Choose status
            </Text>
            <Layout
              level="1"
              style={{
                minHeight: 128,
              }}
            >
              <Select
                size="large"
                selectedIndex={selectedIndex}
                onSelect={(index) => setSelectedIndex(index)}
                style={{ marginBottom: 10 }}
              >
                <SelectItem title="Option 1" />
                <SelectItem title="Option 2" />
                <SelectItem title="Option 3" />
              </Select>
              <Select
                size="large"
                selectedIndex={selectedIndex}
                onSelect={(index) => setSelectedIndex(index)}
              >
                <SelectItem title="Option 1" />
                <SelectItem title="Option 2" />
                <SelectItem title="Option 3" />
              </Select>
            </Layout>
          </Layout>
          <Layout>
            <Text
              style={styles.text}
              category="s1"
              style={{ marginBottom: 20 }}
            >
              4. Pick up Date
            </Text>
            <Layout
              level="1"
              style={{
                minHeight: 128,
              }}
            >
              <Calendar
                date={date}
                onSelect={(nextDate) => setDate(nextDate)}
              />
            </Layout>
          </Layout>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    margin: 2,
  },
});

export default AddTask;
