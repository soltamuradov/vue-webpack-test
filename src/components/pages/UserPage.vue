<tempale>
  <div class="user__page">
    <div class="user__block">
      <img :src="user.avatar_url">
      <h4>{{user.login}}</h4>
    </div>
  </div>
</tempale>

<script>
import {mapState, mapActions, mapMutations} from "vuex"

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
      userLogin: state => state.userLogin
    })
  },
  methods: {
    // ...mapActions({
    //   getUserByLogin: "getUserByLogin"
    // }),
    ...mapMutations({
      setUserLogin: 'setUserLogin'
    })
  },
  // mounted() {
  //   this.getUserByLogin()
  // }
}
</script>

<style scoped>

</style>