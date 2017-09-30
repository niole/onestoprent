import Vue from 'vue';

const HighlevelContract = Vue.component('highlevel-contract', {
  props: {
    contract: {
      type: Object,
      required: true,
    },
    lesseeName: {
      type: String,
      default: "Your",
    },
    address: {
      type: Boolean,
      default: true,
    },
    signed: {
      type: Boolean,
      default: true,
    },
    signatureDeadline: {
      type: Boolean,
      default: true,
    },
    securityDeposit: {
      type: Boolean,
      default: true,
    },
    rent: {
      type: Boolean,
      default: true,
    },
    duration: {
      type: Boolean,
      default: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    rentDue: {
      type: Boolean,
      default: true,
    },
  },
  template:`
    <div>
      <h4>
        {{ lesseeName }} Contract
      </h4>

      <div>
        <div v-if="address">
          address: {{ contract.address }}
        </div>
        <div v-if="signed">
          signed: {{ contract.signed }}
        </div>
        <div v-if="signatureDeadline">
          signature deadline: {{ contract.signDeadline }}
        </div>
        <div v-if="securityDeposit">
          security deposit: {{ contract.securityDeposit }}
        </div>
        <div v-if="rent">
          monthly rent: {{ contract.rent }}
        </div>
        <div v-if="duration">
          contract duration: {{ contract.duration }} days
        </div>
        <div v-if="active">
          contract is <span v-if="!contract.active">not</span> active
        </div>
        <div v-if="rentDue">
          rent due on day {{ contract.rentDue }} of each month
        </div>
      </div>
    </div>
  `
});

export default HighlevelContract;
