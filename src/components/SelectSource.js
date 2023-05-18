import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
  IndexPath,
  TopNavigationAction,
  OverflowMenu,
  MenuItem,
} from "@ui-kitten/components";
import useAuth from "../hooks/useAuth";
import useSource from "../hooks/useSource";
import { Ionicons } from "@expo/vector-icons";
import { CapitalizeNames } from "../utils/Capitalize";

const SelectSource = ({ setSource, setSearch, search }) => {
  const { sources, getSources } = useSource();
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const { user } = useAuth();

  const [menuVisible, setMenuVisible] = React.useState(false);
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );

  const onItemSelect = (index) => {
    setSelectedIndex(index);
    toggleMenu();
  };

  const MenuIcon = (props) => (
    <Ionicons style={{ color: "#5764b8" }} name="briefcase-outline" size={25} />
  );

  useEffect(() => {
    if (user && user.tier) {
      getSources();
    }
    //eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (sources && sources.length <= 0) return;
    if (selectedIndex.row == 0) {
      setSearch({ ...search, source: null });
      setSource(false);
    } else {
      let name = CapitalizeNames(`${sources[selectedIndex.row - 1].short}`);
      setSearch({ ...search, source: name });
      setSource(sources[selectedIndex.row - 1]._id);
    }
  }, [selectedIndex]);

  return (
    <>
      {user && user.tier && (
        <OverflowMenu
          anchor={renderMenuAction}
          visible={menuVisible}
          onBackdropPress={toggleMenu}
          onSelect={onItemSelect}
        >
          <MenuItem title={CapitalizeNames(`Todos`)} key={0} />
          {sources &&
            sources.map((source) => (
              <MenuItem
                title={CapitalizeNames(`${source.short}`)}
                key={source._id}
              />
            ))}
        </OverflowMenu>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  select: {
    flex: 1,
    margin: 2,
  },
});

export default SelectSource;
