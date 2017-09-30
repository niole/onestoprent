import Vue from 'vue';
import HighlevelContract from './HighlevelContract';

const USER_ACTIONS = [
  "rent",
  "message",
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
    rent: {
      template:`
        <div>
          PAY RENT
        </div>
      `
    },
    message: {
      template: `
        <div>
          ANSWER MESSAGE
        </div>
      `
    },
    contractsign: {
      template: `
        <div>
          SIGN CONTRACT
        </div>
      `
    },
    contractrenew: {
      props: [
        'renterData',
        'landlordUserId',
        'renterUserId',
        'currentUserIsRenter',
        'contract',
        'actionLevel',
      ],
      computed: {
        mainMessage: function() {
          if (this.currentUserIsRenter) {
            // is renter
            switch(this.actionLevel) {
              case "ontime":
                return "Your contract expires today, would you like to renew?";
              case "approaching":
                return "Your contract is almost up. Would you like to renew?";
              case "late":
                return "Your contract has expired.";
              default:
                console.warn("This user action doesn't exist");
                return "";
            }
          } else {
            // is landlord
            switch(this.actionLevel) {
              case "ontime":
                return `${this.renterData.name} wants to start the contract renewal process.`;
              case "approaching":
                return `${this.renterData.name}'s contract is about to expire.`;
              case "late":
                return `${this.renterData.name}'s contract has expired.`;
              default:
                console.warn("This user action doesn't exist");
                return "";
            }
          }
        },
        lesseeName: function() {
          if (this.currentUserIsRenter) {
            return "Your";
          }
          return `${this.renterData.name}'s`;
        }
      },
      template: `
        <div>
          <h1>
            Contract Renew
          </h1>
          {{ mainMessage }}
          <highlevel-contract
            :contract="contract"
            :lesseeName="lesseeName"
            :signed="false"
            :active="false"
            :signatureDeadline="false"
            :securityDeposit="false"
            :rentDue="false"
          />
        </div>
      `
    }
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
