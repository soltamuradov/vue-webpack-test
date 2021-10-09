<tempale>
  <div class="user__page">
    <div class="user__block">
      <img :src="user.avatar_url">
      <h4>{{user.login}}</h4>
    </div>
  </div>
</tempale>

<script>
import {mapState, mapActions} from "vuex"

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState({
      user: state => state.user,
    })
  },
  methods: {
    ...mapActions({
      getUserByLogin: "getUserByLogin"
    }),
  },
  mounted() {
    this.getUserByLogin()
  }
}
</script>

<style scoped>

</style>