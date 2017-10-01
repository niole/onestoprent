import Vue from 'vue';
import HighlevelContract from './HighlevelContract';
import ContractRenewalView from './ContractRenewalView';
import ContractSignView from './ContractSign';
import RentView from './RentView';

const USER_ACTIONS = [
  "rent",
  "contractsign",
  "contractrenew",
];

const ACTION_LEVELS = [
  "late",
  "approaching",
  "ontime",
];

function oneOf(types) {
  return function(value) {
    return types.indexOf(value) > -1;
  };
}

const SingleUserActionRenderer = Vue.component('single-user-action-renderer', {
  props: {
    action: {
      type: String,
      validator: oneOf(USER_ACTIONS),
    },
    contract: {
      type: Object,
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
    renterData: {
      type: Object,
    },
    actionLevel: {
      type: String,
      validator: oneOf(ACTION_LEVELS),
    }
  },
  components: {
    rent: RentView,
    contractsign: ContractSignView,
    contractrenew: ContractRenewalView
  },
  template: `
    <div>
       <component v-bind:is="action"
          :contract="contract"
          :renterData="renterData"
          :landlordUserId="landlordUserId"
          :renterUserId="renterUserId"
          :currentUserIsRenter="currentUserIsRenter"
          :actionLevel="actionLevel"
       />
    </div>
  `,
});

export default SingleUserActionRenderer;
