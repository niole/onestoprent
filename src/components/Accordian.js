import Vue from 'vue';

const Accordian = Vue.component('accordian', {
  props: {
    defaultSlot: {
      type: Number,
      default: 1,
    },
    totalSlots: {
      type: Number,
      required: true,
    },
  },
  data: function() {
    return {
      selectedSlot: this.defaultSlot,
    };
  },
  methods: {
    next: function() {
      this.selectedSlot = Math.min(this.selectedSlot+1, this.totalSlots-1);
    },
    previous: function() {
      this.selectedSlot = Math.max(this.selectedSlot-1, 1);
    },
    slotClass: function(i) {
      if (i === this.selectedSlot) {
        return "selected";
      }
    },
  },
  template: `
    <div>
      <div
          v-for="i in totalSlots"
      >
        <div :class="slotClass(i)">
          <span v-on:click="previous">
            previous
          </span>
          <span v-on:click="next">
            next
          </span>
          <slot :name="i">
          </slot>
        </div>
      </div>
    </div>
  `
});

export default Accordian;
