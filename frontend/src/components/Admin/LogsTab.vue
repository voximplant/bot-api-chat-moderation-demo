<template lang="pug">
  v-card
    v-card-title Blocked content logs
    v-card-actions.actions
      v-btn(color="primary" @click="onUpdate" :loading="loading") Update
    v-card-text.line(v-for="log in preparedLogs") {{log}}
</template>

<script lang="ts">
import { Component, Emit, Prop } from 'vue-property-decorator';
import Vue from 'vue';
import { ConversationLog, User } from '@/types';

@Component({})
export default class Chat extends Vue {
  @Prop() logs: ConversationLog[];
  @Prop() users: User[];
  @Prop() loading: boolean;

  get preparedLogs() {
    return this.logs.map(
      (log) =>
        `[${log.createdAt}] [${log.conversationUUID}] [${this.getUserName(
          log.userId,
        )}] Event: [BLOCKED_CONTENT] Blocked: [${
          log.blockedContent
        }] Original message: [${log.originalText}] `,
    );
  }

  getUserName(userId: number): string {
    const user = this.users.find((user) => user.userId === Number(userId));
    return (user && user.userName.split('@')[0]) || String(userId);
  }

  @Emit('update')
  onUpdate() {}
}
</script>

<style scoped>
.line {
  padding-top: 2px;
  padding-bottom: 2px;
}

.actions {
  padding-bottom: 16px;
}
</style>
