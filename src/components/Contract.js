import Vue from 'vue';
import HighlevelContract from './HighlevelContract';

// TODO do in depth contract

const Contract = Vue.component('contract', {
  props: {
    contract: {
      type: Object,
      required: true,
    }
  },
  template:`
    <highlevel-contract
      :contract="contract"
    />
  `
});

export default Contract;
