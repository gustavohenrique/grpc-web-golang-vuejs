<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { events } from '../constants'
export default {
  created () {
    this.$subscribe(events.DIALOG_ERROR, msg => {
      const message = msg && msg.message ? msg.message : msg.toString()
      this.$q.dialog({
        title: 'Ooops. Something is wrong.',
        position: 'bottom',
        message
      })
    })
  },
  data () {
    return {
    }
  }
}
</script>
