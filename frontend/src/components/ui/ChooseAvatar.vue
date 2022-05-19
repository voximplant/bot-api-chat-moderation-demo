<template lang="pug">
  v-dialog(
    v-model="visibleChooseAvatar"
    @click="$emit('update:visibleChooseAvatar', visibleChooseAvatar)"
    persistent
    max-width="350px"
    max-height="400px"
  )
    v-card(class="pa-0")
      v-card-title
        span(class="headline") Choose an avatar
      v-card-text(class="choose-avatar__block")
        v-item-group(class="choose-avatar__list")
          v-avatar(
            v-for="i in 6"
            :key="i"
            @click="choosedImg = i.toString()"
            size="70"
            :class="['choose-avatar__item', {'choose-avatar__item--active': choosedImg == i}]")
            img(:src="require(`@/assets/avatars/${i}.png`)")
      v-card-actions
        div(class="flex-grow-1")
        v-btn(color="blue darken-1" text @click="$emit('update:visibleChooseAvatar', false)") Close
        v-btn(color="red darken-1" text @click="setNewAvatar") Save
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { log } from '@/utils';

@Component({})
export default class ChooseAvatar extends Vue {
  @Prop(Boolean) visibleChooseAvatar: boolean;
  @Prop(Function) setAvatar: any;
  @Prop(String) initialImage?: string;

  public choosedImg: string = '';

  mounted() {
    //@ts-ignore
    this.choosedImg = this.initialImage | '';
  }

  setNewAvatar() {
    this.setAvatar(this.choosedImg);
    this.$emit('update:visibleChooseAvatar', false);
  }
}
</script>

<style scoped>
.choose-avatar__block {
  padding: 16px 24px 0;
}

.choose-avatar__item {
  margin: 8px;
  box-sizing: content-box;
  border: 1px solid transparent;
}

.choose-avatar__item--active {
  box-shadow: 0 1px 12px var(--accent-color)
}

.choose-avatar__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: stretch;
}
</style>
