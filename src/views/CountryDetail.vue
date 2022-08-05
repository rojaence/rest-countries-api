<template>
  <h2>Página de detalles</h2>
  <router-link :to="{ name: 'World' }">Volver</router-link>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'CountryDetail',  
  components: {
    'router-link': RouterLink,
  }
}
</script>