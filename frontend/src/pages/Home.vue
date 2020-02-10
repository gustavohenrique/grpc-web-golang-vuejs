<template>
  <q-page class="q-pa-lg">
    <div class="row justify-between text-weight-bold text-grey-8 text-h5">
      <div class="col-auto">
        Home
      </div>
      <div class="col-2 text-right">
        <q-btn @click="logout" flat color="secondary" icon="logout" dense />
      </div>
    </div>

    <div class="q-pt-lg">
      Welcome to the authenticated area.
    </div>

    <div class="q-pt-lg">
      <q-btn @click="logout" color="primary" label="Logout" />
    </div>
  </q-page>
</template>

<script>
import { events } from '../constants'

export default {
  data () {
    return {
      email: '',
      user: {
        password: '',
        events
      }
    }
  },
  methods: {
    logout () {
      this.$service.account.logout()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
