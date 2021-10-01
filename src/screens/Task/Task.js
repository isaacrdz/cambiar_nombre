import React from "react";
import { Agenda } from "react-native-calendars";
import TaskItem from "../../components/task/TaskItem";
import moment from "moment";
import EmpyDate from "../../components/task/EmptyDate";
import useComment from "../../hooks/useComment";
import useAuth from "../../hooks/useAuth";
import { useFocusEffect } from "@react-navigation/native";
import { getMultiStoresIds } from "../../utils/storesUser";
import { isAdmin, isRockstar, isSuper, isUser } from "../../utils/Authroles";

const Appointment = () => {
  const [items, setItems] = React.useState({});
  const [marked, setMarked] = React.useState({});
  const [refreshing, setRefreshing] = React.useState(false);
  const { getCommentsByUser, getCommentsByStore, getComments, comments, loading } = useComment();
  const { user } = useAuth();

  React.useEffect(() => {
    let mark = [];

    if (comments) {
      const mappedData = comments.map((task) => {
        const date = task.reschedule;

        let color = ''
        if(moment(date).format('YYYY-MM-DD') > moment().format('YYYY-MM-DD')){
          color = '#388e3c'
        }else if( moment(date).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')) {
          color = '#d32f2f'
        } else {
          color = '#f9a825'
        }
        
        mark.push({
          date: moment(date).format("YYYY-MM-DD"),
          selectedColor: color,
          selected: true,
        })

        return{
            ...task,
            date: moment(date).format("YYYY-MM-DD"),
          }
      });


      const reduced = mappedData.reduce((acc, currentItem) => {
        const { date, ...app } = currentItem;

        acc[date] = [app];

        return acc;
      }, {});

      const reducedMarked = mark.reduce((acc, currentItem) => {
        const { date, ...app } = currentItem;

        acc[date] = app;

        return acc;
      }, {});

      setItems(reduced);
      setMarked(reducedMarked);
    }
  }, [comments]);

  useFocusEffect(
    React.useCallback(() => {
      if (user && user.tier && isUser(user.tier._id)) {
        getCommentsByUser(user._id)
      }else if(user && user.tier && isAdmin(user.tier._id) && user.stores){
        getCommentsByStore(`&store[in]=${getMultiStoresIds(user.stores)}`)
      }else if(user && user.tier && (isRockstar(user.tier._id) || isSuper(user.tier._id))){
        getComments();
      }
    }, [user])
  );

  const renderEmptyDate = () => {
    return <EmpyDate />;
  };

  const renderItem = (item) => {
    return <TaskItem item={item} />;
  };

  const handleRefresh = () => {
    if (user && user.tier && isUser(user.tier._id)) {
      getCommentsByUser(user._id)
    }else if(user && user.tier && isAdmin(user.tier._id) && user.stores){
      getCommentsByStore(`&store[in]=${getMultiStoresIds(user.stores)}`)
    }else if(user && user.tier && (isRockstar(user.tier._id) || isSuper(user.tier._id))){
      getComments();
    }
  };

  return (
    <Agenda
      items={items}
      renderItem={renderItem}
      renderEmptyData={renderEmptyDate}
      markedDates={marked}
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
      onRefresh={() => handleRefresh()}
      refreshing={loading}
      // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
      // minDate={moment().format()}
      // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
      // maxDate={"2025-05-30"}
      showClosingKnob={true}
    />
  );
};

export default Appointment;
