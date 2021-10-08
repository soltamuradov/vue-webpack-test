<template>
  <select v-model="modelValue" @change="changeOption">
    <option disabled>Выберите из списка</option>
    <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
    >
      {{option.name}}
    </option>
  </select>

</template>

<script>
import {mapMutations} from "vuex"
export default {
  props: {
    modelValue: {
      type: String
    },
    options: {
      type: Array,
      default: ()=> []
    }
  },
  methods: {
    ...mapMutations({
      setSelectedSort: "setSelectedSort"
    }),
    changeOption(e) {
      this.setSelectedSort(e.target.value)
    }
  }
}
</script>

<style scoped>

</style>