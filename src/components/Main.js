import Vue from 'vue';
import NavBar from './NavBar';
import SingleUserActionView from './SingleUserActionView';
import {
  MAIN_PAGE_ID,
  RENT_PAGE_ID,
  CONTRACT_RENEW_PAGE_ID,
  CONTRACT_SIGN_PAGE_ID,
  MESSAGEPAGE_ID,
} from '../constants';


const Main = Vue.component('main-page', {
    data: function() {
      return {
        isRenter: false,
        userId: "123",
        currentView: MAIN_PAGE_ID,
        renterUserId: "",
        landlordUserId: "",
        alertLevel: "",
      };
    },
    methods: {
      updatePage: function(pageId, alert) {
        this.currentView = pageId;
        this.renterUserId = alert.renterUserId;
        this.landlordUserId = alert.landlordUserId;
        this.alertLevel = alert.level;
      }
    },
    template: `
      <div>
        <nav-bar
          :updatePage="updatePage"
          :isRenter="isRenter"
          :userId="userId"
        />
        <div>
          <single-user-action-view
            :viewType="currentView"
            :currentUserIsRenter="isRenter"
            :landlordUserId="landlordUserId"
            :renterUserId="renterUserId"
            :alertLevel="alertLevel"
          />
        </div>
      </div>
    `
});

export default Main;
