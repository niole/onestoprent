import Vue from 'vue';

const ContractManagementView = Vue.component('contract-management-view', {
  props: {
    userId: {
      type: String,
      required: true,
    },
    currentUserIsRenter: {
      type: Boolean,
      required: true,
    }
  },
  data: function() {
    return {
      view: "find",
    };
  },
  methods: {
    resetView: function() {
      this.view = "find";
    },
    updateView: function(event) {
      this.view = event.target.value;
    },
    getButtonClass: function(buttonType) {
      if (buttonType === this.view) {
        return "selected";
      }
    },
  },
  computed: {
    subHeader: function() {
      if (this.view) {
        if (this.view === "terminate") {
          return "Use the search box to find the contract you wish to terminate.";
        } else if (this.view === "init") {
          return "Fill out the fields in order to start the contract initialization process.";
        } else if (this.view === "find") {
          return "Use the search box to find the contract you're looking for.";
        }
      }
    },
  },
  template: `
    <div>
      <h1>
        Manage Your Contracts
      </h1>
      <h3>
        {{ subHeader }}
      </h3>
      <div>
        <div>
          <button
            v-if="!currentUserIsRenter"
            value="init"
            v-on:click="updateView"
            :class="getButtonClass('init')"
          >
            Initialize New Contract
          </button>
          <button
            value="terminate"
            v-on:click="updateView"
            :class="getButtonClass('terminate')"
          >
            Terminate Contract
          </button>
          <button
            value="find"
            v-on:click="updateView"
            :class="getButtonClass('find')"
          >
            Find Contract
          </button>
        </div>
      </div>
    </div>
  `
});

export default ContractManagementView;
