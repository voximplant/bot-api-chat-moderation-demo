<template lang="pug">
  v-flex(class="chatroom__card-wrapper")
    div(:class="['chatroom__card', {'chatroom__card--me': isMyMessage, 'chatroom__card--user': !isMyMessage}]")
      v-avatar(class="chatroom__card-ava" @click="popupAboutUser = !popupAboutUser" color="indigo")
        v-img(v-if="message.user && message.user.customData.image" :src="require(`@/assets/avatars/${message.user.customData.image}.png`)")
        v-icon(v-else dark) account_circle
      div
        div(class="chatroom__card-title") {{ message.user && message.user.displayName }}
        div(class="chatroom__card-text") {{ message.text }}
          div(class="chatroom__card-time")
            div(class="pr-2") {{ new Date(message.timestamp).toLocaleString() }}

    AboutUser(:visibleAboutUser.sync="popupAboutUser" :user="message.user")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import AboutUser from '@/components/ui/AboutUser.vue';

const conversationStore = namespace('conversations');

@Component({
  components: { AboutUser },
})
export default class CardMessage extends Vue {
  @Prop(Object) message: any;
  @Prop(Function) editMessage: any;
  @conversationStore.State readonly currentUser: any;
  @conversationStore.Getter readonly currentConversationMyPermissions: any;
  @conversationStore.Mutation deleteMessageToConversation: any;
  @conversationStore.Action deleteMessage: any;

  public showMenu: boolean = false;
  public popupAboutUser: boolean = false;

  get isMyMessage(): boolean {
    return (
      this.message.user && this.message.user.userId === this.currentUser.userId
    );
  }
}
</script>

<style scoped>
.chatroom__card-wrapper {
  display: flex;
  padding: 12px 0;
}

.chatroom__card {
  display: flex;
  position: relative;
  width: 70%;
  align-items: flex-end;
}

.chatroom__card--me {
  flex-direction: row-reverse;
  margin-left: auto;
}

.chatroom__card--me .chatroom__card-title {
  text-align: end;
}

.chatroom__card--me .chatroom__card-text {
  background-color: var(--light-color);
}

.chatroom__card--user {
  flex-direction: row;
  margin-right: auto;
}

.chatroom__card--user .chatroom__card-text {
  background-color: var(--lighter-color);
}

.chatroom__card-ava {
  margin: 0 12px;
}

.chatroom__card-title {
  font-size: medium;
  font-weight: bold;
}

.chatroom__card-text {
  padding: 12px;
  border-radius: 10px;
  white-space: pre-line;
}

.chatroom__card-time {
  font-size: small;
  font-weight: lighter;
  text-align: end;
  padding-left: 40px;
}

.chatroom__card--me .chatroom__card-time {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
</style>
