<template>
    <div>
        <div class="data-list__list__row" v-for="item in items" :key="item[keyname]">
            <v-layout class="data-list__list__row__data-cell">
                <slot :item="item"></slot>
            </v-layout>
            <div class="data-list__list__row__actions-cell">
                <slot name="actions" :item="item"></slot>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .data-list {
        @include hoverActions();
    }
</style>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator'

  @Component
  export default class DataList extends Vue {
    @Prop(Array) items;
    @Prop(String) keyname;
  }
</script>
