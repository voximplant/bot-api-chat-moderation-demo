<template lang="pug">
  v-dialog(
  v-model="visibleConfirmation"
  persistent
  max-width="350"
  @click="$emit('update:visibleConfirmation', visibleConfirmation)"
  )
    v-card
      v-card-title(style="word-break: break-word") Are you sure you want to {{ TYPE_ACTION[`${nameAction}`] }}?
      v-card-actions
        div(class="flex-grow-1")
        v-btn(color="primary" text @click="$emit('update:visibleConfirmation', false)") Cancel
        v-btn(color="accent" text @click="handleConfirm") {{ nameAction }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class PopupConfirmation extends Vue {
  @Prop(Boolean) visibleConfirmation: boolean;
  @Prop(Function) callback: any;
  @Prop(String) nameAction: string;

  public TYPE_ACTION: object = {
    'leave': 'leave this conversation',
    'delete': 'delete this message'
  };

  handleConfirm(): void {
    this.callback();
    this.$emit('update:visibleConfirmation', false)
  }
}
</script>

<style scoped>
</style>
