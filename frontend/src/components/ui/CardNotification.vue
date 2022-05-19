<template lang="pug">
  v-flex(v-if="isMyMessage" class="chatroom__notification-card-wrapper")
    div(class="chatroom__notification-card")
      div(class="chatroom__notification-card-text") {{ message.text }}

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import Confirmation from '@/components/ui/Confirmation.vue';
import AboutUser from '@/components/ui/AboutUser.vue';

const conversationStore = namespace('conversations');

@Component({
  components: { Confirmation, AboutUser },
})
export default class CardMessage extends Vue {
  @Prop(Object) message: any;
  @conversationStore.State readonly currentUser: any;

  get isMyMessage(): boolean {
    return Number(this.message.userId) === Number(this.currentUser.userId);
  }
}
</script>

<style scoped>
.chatroom__notification-card-wrapper {
  display: flex;
  padding: 12px 0;
  justify-content: center;
}

.chatroom__notification-card {
  display: flex;
  position: relative;
}

.chatroom__notification-card-text {
  padding: 12px;
  border-radius: 10px;
  white-space: pre-line;
  background-color: var(--lighter-color);
}
</style>
