import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
  IndexPath,
  Select,
  SelectItem,
  TopNavigationAction,
  OverflowMenu,
  MenuItem,
} from "@ui-kitten/components";
import moment from "moment";
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
} from "./../utils/Authroles";
import useStore from "../hooks/useStore";
import { CapitalizeNames } from "../utils/Capitalize";
import { getMultiStoresIds } from "../utils/storesUser";

const SelectStore = ({ selectedStores, setSelectedStores }) => {
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  //   const displayValue = data[selectedIndex.row];
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

      //     if(getSources) getSources(user.tier._id);
      //     if(getMakes) getMakes(user.tier._id);

      getStoresDPX(String(user.tier._id), user.group);
    }
  }, [user]);

  useEffect(() => {
    if (stores && stores.length >= 1) {
      setSelectedStores(getMultiStoresIds(stores));
    }
  }, [stores]);

  const getStoresDPX = (role, groupId) => {
    if (isAdmin(role) || isUser(role) || isMarketing(role)) {
      getStoresByUser(user._id);
    } else if (isSuper(role) || isDigitalMkt(role) || isGeneralManager(role)) {
      getStoresByGroup(user.group._id);
    } else if (isRockstar(role)) {
      getStores(true);
    } else if (role === "group") {
      getStoresByGroup(groupId);
    }
  };

  const MenuIcon = (props) => (
    <Ionicons style={{ color: "#5764b8" }} name="business-outline" size={25} />
  );

  useEffect(() => {
    if (user && user.tier) {
      if (user.carType) {
        if (user.carType === "ambos") {
          //   setCarType('nuevo')
        } else {
          //   setCarType(user.carType)
        }
      }
    }
    //eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (stores && stores.length <= 0) return;
    if (selectedIndex.row == 0) {
      setSelectedStores(getMultiStoresIds(stores));
    } else {
      setSelectedStores(stores[selectedIndex.row - 1]._id);
    }
  }, [selectedIndex]);

  return (
    <>
      {user &&
        user.tier && stores &&
        stores.length >= 2 &&
        (isRockstar(user.tier._id) ||
          isSuper(user.tier._id) ||
          isMarketing(user.tier._id) ||
          ((isAdmin(user.tier._id) || isUser(user.tier._id)) &&
            user.carType &&
            user.carType === "ambos")) && (
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

const styles = StyleSheet.create({
  select: {
    flex: 1,
    margin: 2,
  },
});

export default SelectStore;
