import Vue from 'vue';
import {
  getUserData,
  getLesseeContract,
} from '../queryUtil';
import SingleUserActionRenderer from './SingleUserActionRenderer';

const SingleUserActionView = Vue.component('single-user-action-view', {
  props: {
    viewType: {
      type: String,
    },
    currentUserIsRenter: {
      type: Boolean,
    },
    landlordUserId: {
      type: String,
    },
    renterUserId: {
      type: String,
    },
    alertLevel: {
      type: String,
    },
  },
  data: function() {
    return {
      renter: {},
      contract: {},
    };
  },
  mounted: function() {
    getUserData(this.renterUserId)
      .then(({ data }) => {
        this.renter = data;
      })
      .catch(error => console.error(error));

    getLesseeContract(this.renterUserId)
      .then(({ data }) => {
        this.contract = data;
      })
      .catch(error => console.error(error));
  },
  watch: {
    renterUserId: function(id) {
      getUserData(this.renterUserId)
        .then(({ data }) => {
          this.renter = data;
        })
        .catch(error => console.error(error));

      getLesseeContract(this.renterUserId)
        .then(({ data }) => {
          this.contract = data;
        })
        .catch(error => console.error(error));
    }
  },
  template: `
    <div>
      <single-user-action-renderer
        :action="viewType"
        :actionLevel="alertLevel"
        :contract="contract"
        :currentUserIsRenter="currentUserIsRenter"
        :landlordUserId="landlordUserId"
        :renterUserId="renterUserId"
        :renterData="renter"
      />
    </div>
  `
});

export default SingleUserActionView;
