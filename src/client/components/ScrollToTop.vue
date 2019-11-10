<template>
  <v-fab-transition>
    <v-btn
        color="green"
        dark
        fixed
        bottom
        right
        fab
        v-show="show"
        @click="smoothScrollToTop()"
    >
      <v-icon>keyboard_arrow_up</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script>
  export default {
    props: ['show', 'speed'],
    methods: {
      smoothScrollToTop() {
        let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(this.smoothScrollToTop);
          window.scrollTo(0, Math.floor(currentScroll - (currentScroll / this.speed)));
        }
      }
    }
  }
</script>