import Vue from 'vue';
import Contract from './Contract';

const ContractRenewalApprovalProcess = Vue.component('contract-renewal-approval-process', {
  props: {
    contract: {
      type: Object,
      required: true,
    },
    renterData: {
      type: Object,
      required: true,
    }
  },
  methods: {
    renewContract: function() {
      console.log('renew contract for ', this.renterData.name);
    },
    rejectRequest: function() {
      console.log('reject ', this.renterData.name);
    },
  },
  template:`
    <div>
      <h1>
        Review {{ renterData.name }}'s Contract
      </h1>
      <contract :contract="contract" />
      <div>
        If everything looks good to, approve the renewal request
        <div>
          <button v-on:click="renewContract">
            Renew Request
          </button>
          <button v-on:click="rejectRequest">
            Reject Request
          </button>
        </div>
      </div>
    </div>
  `
});

export default ContractRenewalApprovalProcess;
