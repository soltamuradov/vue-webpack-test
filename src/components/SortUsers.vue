<template>
  <select class="sort" v-model="modelValue" @change="changeOption">
    <option class="sort" disabled value="">Выберите из списка</option>
    <option class="sort"
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