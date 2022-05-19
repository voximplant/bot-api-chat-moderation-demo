<template lang="pug">
  v-card.pt-4
    v-card-title Single conversations
    .pb-4(v-for="conversation in singleConversations")
      .d-flex.align-center
        v-card-text.user-name Conversation between {{conversation[0].userName}} and {{conversation[1].userName}}
        v-card-text {{conversation[0].chatLink}}
        v-card-actions
          v-btn(color="primary" @click="onCopyUrl(conversation[0].conversationUUID)") Copy link

    v-card-title Conversation pairs
    .pb-4(v-for="pairs in pairedConversations")
      v-card-subtitle Conversation between {{pairs[0].userName}} and {{pairs[1].userName}}
      .d-flex(v-for="pair in pairs")
        v-card-text.user-name {{pair.userName}}
        v-card-text {{pair.chatLink}}
        v-card-actions
          v-btn(color="primary" @click="onCopyUrl(pair.conversationUUID)") Copy link
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';
import { PairedConversations } from '@/types/src/bot';
import { URL_APP_FRONTEND } from '@/config';
import { User } from '@/types';

@Component({})
export default class Chat extends Vue {
  @Prop() conversations: PairedConversations[];
  @Prop() users: User[];

  getUserName(userId: number): string {
    const user = this.users.find(
      (user) => Number(user.userId) === Number(userId),
    );
    return (user && user.userName.split('@')[0]) || String(userId);
  }

  getChatLink(uuid: string) {
    return `${URL_APP_FRONTEND}/chat/${uuid}`;
  }

  get preparedConversations() {
    return this.conversations.map((conversationPair) =>
      conversationPair.map((conversation) => ({
        userId: conversation.userId,
        userName: this.getUserName(conversation.userId),
        conversationUUID: conversation.conversationUUID,
        chatLink: this.getChatLink(conversation.conversationUUID),
      })),
    );
  }

  get pairedConversations() {
    return this.preparedConversations.filter(
      (conversation) => conversation[0].chatLink !== conversation[1].chatLink,
    );
  }

  get singleConversations() {
    return this.preparedConversations.filter(
      (conversation) => conversation[0].chatLink === conversation[1].chatLink,
    );
  }

  onCopyUrl(uuid: string) {
    const url = this.getChatLink(uuid);
    navigator.clipboard.writeText(url);
  }
}
</script>

<style scoped>
.user-name {
  max-width: 25%;
}
</style>
