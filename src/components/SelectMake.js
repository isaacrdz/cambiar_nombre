import React, { useEffect } from "react";
import {
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
} from "./../utils/Authroles";
import useMake from "../hooks/useMake";
import { CapitalizeNames } from "../utils/Capitalize";

const SelectMake = () => {
  const { user } = useAuth();
  const { makes, getMakes } = useMake();

  const [menuVisible, setMenuVisible] = React.useState(false);
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );

  const onItemSelect = (index) => {
    toggleMenu();
  };

  useEffect(() => {}, [makes]);
  useEffect(() => {
    if (user && user.tier) {
      if (getMakes) getMakes(user.tier._id);
    }
    //eslint-disable-next-line
  }, [user]);

  const MenuIcon = (props) => (
    <Ionicons style={{ color: "#5764b8" }} name="logo-octocat" size={25} />
  );

  return (
    <>
      {user &&
        user.tier &&
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
            {makes.map((make, i) => (
              <MenuItem title={`${CapitalizeNames(make.name)}`} key={i} />
            ))}
          </OverflowMenu>
        )}
    </>
  );
};

export default SelectMake;
