import React from "react";
import { StyleSheet } from "react-native";
import { IndexPath, Layout, Select, SelectItem } from "@ui-kitten/components";

// import I18n from 'react-native-i18n'

const data = ["All Time", "Today", "Yesterday", "This Month", "Last Month"];

const Home = () => {
  React.useEffect(() => {
    // I18n.initAsync();
  }, []);

  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

  const displayValue = data[selectedIndex.row];

  return (
    <Layout style={styles.container} level="1">
      <Select
        style={styles.select}
        placeholder="Default"
        value={displayValue}
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
      >
        {data.map((title, i) => (
          <SelectItem title={title} key={i} />
        ))}
      </Select>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  select: {
    flex: 1,
    margin: 2,
  },
});

export default Home;
