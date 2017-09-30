import Vue from 'vue';
import {
  getUserData,
  getLesseeContract,
} from '../queryUtil';

const SingleUserActionView = Vue.component('single-user-action-view', {
  props: {
    viewType: {
      type: String,
    },
    currentUserIsRenter: {
      type: Boolean,
    },
    userId: {
      type: String,
    },
  },
  data: function() {
    return {
      user: {},
      contract: {},
    };
  },
  watch: {
    userId: function(id) {
      getUserData(this.userId)
        .then(({ data }) => {
          this.user = data;
        })
        .catch(error => console.error(error));

      getLesseeContract(this.userId)
        .then(({ data }) => {
          this.contract = data;
        })
        .catch(error => console.error(error));
    }
  },
  template: `
    <div>
      {{ userId }}
      {{ currentUserIsRenter }}
      {{ viewType }}
      {{ user.name }}
      {{ contract.address }}
    </div>
  `
});

export default SingleUserActionView;
