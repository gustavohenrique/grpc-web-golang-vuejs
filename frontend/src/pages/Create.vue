<template>
  <q-page class="q-pa-lg flex column fit">
    <div class="col flex column justify-evenly">
      <div class="col-3 text-h5">
        Create Account
      </div>
      <div class="col-auto">
        <q-form ref="form" class="bg-white" v-on:submit="submit">
          <div class="field q-mb-md q-mt-xl">
            <q-input
              square
              bg-color="white"
              label="Email"
              v-model="user.email"
              stack-label
              maxlength="255"
            />
          </div>
          <div>
            <div class="field q-mb-md">
              <q-input
                square
                maxlength="255"
                bg-color="white"
                label="Password"
                stack-label
                v-model="user.password"
                :type="isPwd ? 'password' : 'text'"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
            <div class="field q-pt-md">
              <q-btn
                type="submit"
                color="primary"
                class="full-width"
                label="Create Account"
              />
            </div>
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
import { events } from '../constants'

export default {
  data () {
    return {
      isPwd: true,
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    submit () {
      const form = this.$refs.form
      form.validate().then(async success => {
        if (success) {
          try {
            await this.$service.account.create(this.user)
            this.$q.notify({
              color: 'green-8',
              message: 'Thanks for your register. You can do login now.'
            })
            this.$router.push({ name: 'login' })
          } catch (err) {
            this.$publish(events.DIALOG_ERROR, err)
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.bg-custom {
  background-color: #7f00ff;
}
</style>
