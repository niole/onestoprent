import Vue from 'vue';
import {
  getUserData,
  getMessages,
} from '../queryUtil';

const MessagesView = Vue.component('messages-view', {
  props: {
    renterUserId: {
      type: String,
      required: true,
    },
    landlordUserId: {
      type: String,
      required: true,
    },
    defaultMessage: {
      type: Object,
      default: function() {
        return {};
      },
    },
    currentUserIsRenter: {
      type: Boolean,
      required: true,
    },
  },
  data: function() {
    return {
      messages: [],
      selectedMessage: this.defaultMessage,
    };
  },
  mounted: function() {
    const userId = this.currentUserIsRenter ?
      this.renterUserId :
      this.landlordUserId;

    getMessages(userId)
      .then(({ data }) => {
        this.messages = data;
      })
      .catch(error => console.error(error));
  },
  methods: {
    shorthandMessageLabel: function(message) {
      const {
        renterName,
        landlordName,
        createdAt,
      } = message;
      return `${createdAt}, ${renterName}, ${landlordName}`;
    },
    getShorthandMessageClass: function(message) {
      const {
        id,
        read,
      } = message;

      let cls = "";

      if (id === this.selectedMessage.id) {
        cls += "selected";
      }

      if (read) {
        cls += " read";
      }

      if (cls) {
        return cls;
      }

    },
    updateSelectedMessage: function(message) {
      this.selectedMessage = message;
    },
  },
  template:`
    <div class="messaging-container">

      <div class="side-nav">
         <div
            v-for="message in messages"
            class="shorthand-message"
         >
            <span
              v-on:click="updateSelectedMessage(message)"
              :class="getShorthandMessageClass(message)"
            >
              {{ shorthandMessageLabel(message) }}
           </span>
         </div>
      </div>

      <div>
        {{ selectedMessage.content }}
      </div>

    </div>
  `
});

export default MessagesView;
