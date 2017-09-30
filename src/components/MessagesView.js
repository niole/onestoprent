import Vue from 'vue';
import {
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
    selectedMessage: {
      type: Object,
      default: {},
    },
    currentUserIsRenter: {
      type: Boolean,
      required: true,
    },
  },
  data: function() {
    return {
      messages: [],
      selectedMessageId: this.selectedMessage.id,
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
  template:`
    <div>
      <h1>
        Messages
      </h1>
      <div>
        <div>
           <div
              v-for="message in messages"
           >
              <span
                v-if="message.id === selectedMessageId"
              >
               selected
             </span>
              <span
                v-if="message.id !== selectedMessageId"
              >
              message
             </span>
           </div>
        </div>
      </div>
    </div>
  `
});

export default MessagesView;
