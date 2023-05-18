import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
  IndexPath,
  TopNavigationAction,
  OverflowMenu,
  MenuItem,
} from "@ui-kitten/components";
import useAuth from "../hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";

const data = [
  "Todos",
  "Digital",
  "Showroom",
  "Bdc",
  "Servicio",
  "Hyp",
  "Refacciones",
];

const SelectLeadType = ({ setLeadType, setSearch, search }) => {
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
    <Ionicons style={{ color: "#5764b8" }} name="bar-chart-outline" size={25} />
  );

  useEffect(() => {
    if (user && user.tier) {
      if (user.leadType) {
        if (user.leadType === "all") {
          setLeadType("");
        } else {
          setLeadType(user.leadType);
        }
      }
    }
    //eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    switch (selectedIndex.row) {
      case 0:
        if (setLeadType) {
          setLeadType("all");
          setSearch({ ...search, leadType: "" });
        }
        return;
      case 1:
        if (setLeadType) {
          setLeadType("digital");
          setSearch({ ...search, leadType: "Digital" });
        }
        return;
      case 2:
        if (setLeadType) {
          setLeadType("showroom");
          setSearch({ ...search, leadType: "Showroom" });
        }
        return;
      case 3:
        if (setLeadType) {
          setLeadType("bdc");
          setSearch({ ...search, leadType: "Bdc" });
        }
        return;
      case 4:
        if (setLeadType) {
          setLeadType("servicio");
          setSearch({ ...search, leadType: "Servicio" });
        }
        return;
      case 5:
        if (setLeadType) {
          setLeadType("hyp");
          setSearch({ ...search, leadType: "Hyp" });
        }
        return;
      default:
        if (setLeadType) {
          setLeadType("all");
          setSearch({ ...search, leadType: "" });
        }
        return;
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
          {data.map((title, i) => (
            <MenuItem title={title} key={i} />
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

export default SelectLeadType;
