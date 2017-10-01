import {
  MAIN_PAGE_ID,
} from './constants';

var store = {
  isRenter: false,
  userId: "123",
  currentView: MAIN_PAGE_ID,
  renterUserId: "",
  landlordUserId: "",
  alert: {
    level: "",
  },
};

export default store;
