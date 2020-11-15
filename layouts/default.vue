<template>
  <div>
    <navbar />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";

export default {
  name: "default",
  components: {
    Footer,
    Navbar
  }
}
</script>

<style scoped>

</style>
