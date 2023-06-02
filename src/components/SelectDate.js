import React, { useEffect, useState } from "react";
import {
  TopNavigationAction,
  OverflowMenu,
  MenuItem,
} from "@ui-kitten/components";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
const data = [
  "Hoy",
  "Ayer",
  "Este Mes",
  "Mes Anterior",
  "2022",
  "2021",
  "2020",
];

const SelectDate = ({ setDate, getFilter, setSearch, search }) => {
  const [selectedIndex, setSelectedIndex] = useState(false);
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
    <Ionicons style={{ color: "#5764b8" }} name="calendar-outline" size={25} />
  );

  useEffect(() => {
    if (!selectedIndex) return;
    switch (selectedIndex.row) {
      case 0:
        setSearch({ ...search, date: "de hoy" });
        if (getFilter) getFilter("HH:00 a");
        return setDate(
          `&createdAt[gte]=${moment()
            .startOf("day")
            .format()}&createdAt[lt]=${moment()
            .add("1", "days")
            .startOf("day")
            .format()}`
        );
      case 1:
        setSearch({ ...search, date: "de ayer" });
        if (getFilter) getFilter("HH:00 a");
        return setDate(
          `&createdAt[gte]=${moment()
            .subtract("1", "days")
            .startOf("day")
            .format()}&createdAt[lt]=${moment().startOf("day").format()}`
        );
      case 2:
        setSearch({ ...search, date: "de este mes" });
        if (getFilter) getFilter("DD MMMM YYYY");
        return setDate(
          `&createdAt[gte]=${moment()
            .startOf("month")
            .format()}&createdAt[lt]=${moment().endOf("month").format()}`
        );
      case 3:
        setSearch({ ...search, date: "del mes anterior" });
        if (getFilter) getFilter("DD MMMM YYYY");
        return setDate(
          `&createdAt[gte]=${moment()
            .subtract("1", "months")
            .startOf("month")
            .format()}&createdAt[lt]=${moment()
            .subtract("1", "months")
            .endOf("month")
            .format()}`
        );
      case 4:
        setSearch({ ...search, date: "del 2022" });
        if (getFilter) getFilter("DD MMMM YYYY");
        return setDate(
          `&createdAt[gte]=${moment()
            .startOf("year")
            .format()}&createdAt[lt]=${moment().endOf("year").format()}`
        );
      case 5:
        setSearch({ ...search, date: "del 2021" });
        if (getFilter) getFilter("DD MMMM YYYY");
        return setDate(
          `&createdAt[gte]=${moment()
            .subtract("1", "year")
            .startOf("year")
            .format()}&createdAt[lt]=${moment()
            .subtract("1", "year")
            .endOf("year")
            .format()}`
        );
      case 6:
        setSearch({ ...search, date: "del 2020" });
        if (getFilter) getFilter("DD MMMM YYYY");
        return setDate(
          `&createdAt[gte]=${moment()
            .subtract("2", "years")
            .startOf("year")
            .format()}&createdAt[lt]=${moment()
            .subtract("2", "years")
            .endOf("year")
            .format()}`
        );
      default:
        setSearch({ ...search, date: null });
        if (getFilter) getFilter("DD MMMM YYYY");
        return setDate(
          `&createdAt[gte]=${moment()
            .startOf("month")
            .format()}&createdAt[lt]=${moment().endOf("month").format()}`
        );
    }
  }, [selectedIndex]);

  return (
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
  );
};

export default SelectDate;
