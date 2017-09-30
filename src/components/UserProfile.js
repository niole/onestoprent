import Vue from 'vue';

const UserProfile = Vue.component('user-profile', {
  props: [
    'name',
    address: {
      default: '-',
      type: String,
    },
    phone: {
      default: '-',
      type: Number,
    },
    sms: {
      default: '-',
      type: Number,
    },
    email: {
      default: '-',
      type: String,
    }
  ],
  template: `
    <div>
      name: {{ name }}
      address: {{ address }}
      phone: {{ phone }}
      sms: {{ sms }}
      email: {{ email }}
    </div>
  `
});

export default UserProfile;
