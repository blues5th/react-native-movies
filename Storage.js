import AsyncStorage from "@react-native-community/async-storage";
import { bookingApi } from "./api";
import { sortItem } from "./utils";

export const storeBookingData = async () => {
  const [bookingList, bookingListError] = await bookingApi.getAllBookingList();
  try {
    sortItem(bookingList);
    const jsonValue = JSON.stringify(bookingList);
    await AsyncStorage.setItem("@booking_list", jsonValue);
    if (bookingListError) {
      return bookingListError;
    }
  } catch (e) {
    console.log(e);
  }
};

export const getStoreBookingData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@booking_list");
    if (jsonValue == null) {
      await storeBookingData();
      return await AsyncStorage.getItem("@booking_list");
    }
    return JSON.parse(jsonValue);
  } catch (e) {
    console.log(e);
  }
};
