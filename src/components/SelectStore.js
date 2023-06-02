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
import {
  isAdmin,
  isMarketing,
  isRockstar,
  isSuper,
  isUser,
  isDigitalMkt,
  isGeneralManager,
  isSalesManager,
} from "./../utils/Authroles";
import useStore from "../hooks/useStore";
import { CapitalizeNames } from "../utils/Capitalize";
import { getMultiStoresIds } from "../utils/storesUser";

const SelectStore = ({ setSelectedStores, setSearch, search }) => {
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const { user } = useAuth();
  const {
    stores,
    getStores,
    getStoresByUser,
    getStoresByGroup,
    clearStoreState,
  } = useStore();

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

  useEffect(() => {
    if (user && user.tier) {
      clearStoreState();
      getStoresDPX(String(user.tier._id), user.group);
    }
  }, [user]);

  useEffect(() => {
    if (stores && stores.length >= 1)
      setSelectedStores(getMultiStoresIds(stores));
  }, [stores]);

  const getStoresDPX = (role, groupId) => {
    if (
      isAdmin(role) ||
      isUser(role) ||
      isMarketing(role) ||
      isSalesManager(role) ||
      isGeneralManager(role)
    ) {
      getStoresByUser(user._id);
    } else if (isSuper(role) || isDigitalMkt(role)) {
      getStoresByGroup(user.group._id);
    } else if (isRockstar(role)) {
      getStores(true);
    } else if (role === "group") {
      getStoresByGroup(groupId);
    }
  };

  const MenuIcon = () => (
    <Ionicons style={{ color: "#5764b8" }} name="business-outline" size={25} />
  );

  useEffect(() => {
    if (stores && stores.length <= 0) return;
    if (selectedIndex.row == 0) setSelectedStores(getMultiStoresIds(stores));
    else {
      let name = CapitalizeNames(
        `${stores[selectedIndex.row - 1].make.name} ${
          stores[selectedIndex.row - 1].name
        }`
      );
      setSearch({ ...search, store: name });
      setSelectedStores(stores[selectedIndex.row - 1]._id);
    }
  }, [selectedIndex]);

  return (
    <>
      {stores && stores.length >= 1 && (
        <OverflowMenu
          anchor={renderMenuAction}
          visible={menuVisible}
          onBackdropPress={toggleMenu}
          onSelect={onItemSelect}
        >
          <MenuItem title={`Todas las Agencias`} value={"all"} />

          {stores.map((store, i) => (
            <MenuItem
              key={i}
              title={`${store.make.slug + " " + CapitalizeNames(store.name)}`}
              value={store._id}
            />
          ))}
        </OverflowMenu>
      )}
    </>
  );
};

export default SelectStore;
