<template>
  <h2>Página principal</h2>
  <router-link :to="{ name: 'CountryDetail' }">Volver</router-link>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'World',  
  components: {
    'router-link': RouterLink,
  }
}
</script>