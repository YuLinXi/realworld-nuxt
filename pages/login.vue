<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <nuxt-link to="/register">Need an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <li v-if="errorMessage">{{ errorMessage }}</li>
          </ul>

          <form>
            <fieldset class="form-group">
              <input v-model="formData.email" class="form-control form-control-lg" type="text" placeholder="Email">
            </fieldset>
            <fieldset class="form-group">
              <input v-model="formData.password" class="form-control form-control-lg" type="password" placeholder="Password">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" @click.stop.prevent="handleLogin">
              Sign up
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import parseErrors from "~/utils/parseErrors";

const Cookie = process.client ? require('js-cookie') : undefined
export default {
  name: "login",
  middleware: 'notAuthenticated',
  data() {
    return {
      formData: {
        email: '',
        password: '',
      },
      errorMessage: ''
    }
  },
  methods: {
    ...mapMutations(['setUser', 'setToken']),
    async handleLogin() {
      try {
        const { user } = await this.$axios.post('/users/login', {
          user: this.formData
        })
        this.setUser(user);
        Cookie.set('user', user)
        this.$router.push('/')
      } catch (err) {
        this.errorMessage = parseErrors(err);
        //
      }
    }
  }
}
</script>

<style scoped>
  .error-messages {
    min-height: 24px;
  }
</style>
