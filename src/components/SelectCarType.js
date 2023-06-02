import React, { useEffect, useState } from "react";
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
  isGeneralManager,
  isMarketing,
  isRockstar,
  isSalesManager,
  isSuper,
  isUser,
} from "./../utils/Authroles";
const data = ["Todos", "Nuevos", "Seminuevos"];

const SelectCarType = ({ setCarType, setSearch, search }) => {
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
    <Ionicons style={{ color: "#5764b8" }} name="car-outline" size={25} />
  );

  useEffect(() => {
    if (user && user.tier) {
      if (user.carType) {
        if (user.carType === "ambos") {
          setCarType("all");
        } else {
          if (user.carType === "nuevo") {
            setSelectedIndex(new IndexPath(1));
            setCarType("nuevo");
          } else {
            setSelectedIndex(new IndexPath(2));
            setCarType("seminuevo");
          }
        }
      }
    }
    //eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    switch (selectedIndex.row) {
      case 0:
        if (setCarType) {
          setCarType("all");
          setSearch({ ...search, carType: "" });
        }
        return;
      case 1:
        if (setCarType) {
          setCarType("nuevo");
          setSearch({ ...search, carType: "Nuevos" });
        }
        return;
      case 2:
        if (setCarType) {
          setCarType("seminuevo");
          setSearch({ ...search, carType: "Seminuevos" });
        }
        return;
      default:
        if (setCarType) {
          setCarType("all");
          setSearch({ ...search, carType: "" });
        }
        return;
    }
  }, [selectedIndex]);

  return (
    <>
      {user &&
        user.tier &&
        (isRockstar(user.tier._id) ||
          isSuper(user.tier._id) ||
          isMarketing(user.tier._id) ||
          ((isAdmin(user.tier._id) ||
            isGeneralManager(user.tier._id) ||
            isSalesManager(user.tier._id) ||
            isUser(user.tier._id)) &&
            user.carType &&
            user.carType === "ambos")) && (
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

export default SelectCarType;
