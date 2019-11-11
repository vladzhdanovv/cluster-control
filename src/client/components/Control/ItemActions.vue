<template>
  <span>
    <v-btn text icon color="blue darken-2" @click="$emit('edit')">
      <v-icon class="blue--text text--darken-2" >
        mdi-pencil
      </v-icon>
    </v-btn>
    <v-btn text icon color="red" @click="$emit('remove')">
      <v-icon class="red--text">
        mdi-delete
      </v-icon>
    </v-btn>
  </span>
</template>
