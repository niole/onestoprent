import Vue from 'vue';
const NavBar = require('./NavBar');

const Main = Vue.component('main-page', {
    data: function() {
      return {
        alerts: [],
        messages: [],
      };
    },
    template: `
      <div>
        <nav-bar
          :messages="messages"
          :alerts="alerts"
        />
      </div>
    `
});

export default Main;
