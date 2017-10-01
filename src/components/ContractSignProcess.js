import Vue from 'vue';
import Contract from './Contract';

// TODO must do more than just click button

const ContractSignProcess = Vue.component('contract-sign-process', {
  props: [
    'renterData',
    'contract',
  ],
  methods: {
    submit: function() {
      console.log('submit');
    },
  },
  template:`
    <div>
      <h1>
        Review And Sign Your Contract
      </h1>
      <contract :contract="contract" />
      <button v-on:click="submit">
        Sign
      </button>
    </div>
  `
});

export default ContractSignProcess;
