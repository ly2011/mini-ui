<template>
  <div>
    <i-button type="primary" @click="handleClick">我是主按钮</i-button>
    <i-button-group vertical>
      <i-button>Cancel</i-button>
      <i-button type="primary">Confirm</i-button>
    </i-button-group>

    <hr>
    <i-radio v-model="single">北京</i-radio>
    <i-radio-group v-model="phone">
      <i-radio label="apple">
        <span>Apple</span>
      </i-radio>
      <i-radio label="android">
        <span>Android</span>
      </i-radio>
      <i-radio label="windows">
        <span>Windows</span>
      </i-radio>
    </i-radio-group>
  </div>
</template>

<script>
import iButton from '@/components/button/button.vue'
import iButtonGroup from '@/components/button/button-group.vue'

import iRadio from '@/components/radio/radio.vue'
import iRadioGroup from '@/components/radio/radio-group.vue'

export default {
  components: {
    iButton,
    iButtonGroup,
    iRadio,
    iRadioGroup
  },
  data () {
    return {
      single: false,
      phone: ''
    }
  },
  methods: {
    handleClick (event) {
      console.log(event)
    }
  }
}
</script>
