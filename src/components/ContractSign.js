import Vue from 'vue';
import HighlevelContract from './HighlevelContract';

const ContractSignView = Vue.component('contract-sign-view', {
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
            return "Your signature has been received.";
          case "approaching":
            return `Your contract sign deadline is ${contract.signDeadline}.`;
          case "late":
            return `You missed your contract sign deadline on ${contract.signDeadline}. Contact your landlord if you'd like to start over.`;
          default:
            console.warn("This user action doesn't exist");
            return "";
        }
      } else {
        // is landlord
        switch(this.actionLevel) {
          case "ontime":
            return `${this.renterData.name}'s contract has been signed.`;
          case "approaching":
            return `${this.renterData.name}'s contract sign deadline is approaching.`;
          case "late":
            return `${this.renterData.name}'s contract sign deadline has expired.`;
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
        Sign Contract
      </h1>
      {{ mainMessage }}
      <highlevel-contract
        :contract="contract"
        :lesseeName="lesseeName"
        :active="false"
        :signatureDeadline="false"
      />
    </div>
  `
});

export default ContractSignView;
