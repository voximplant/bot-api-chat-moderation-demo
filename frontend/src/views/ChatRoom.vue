<template lang="pug">
  v-container(class="pa-0")
    v-overlay(v-if="loading" :value="loading" class="chatroom__loading")
      v-progress-circular(indeterminate size="64")

    v-container(v-else class="chatroom__wrapper")
      v-container(
        id="listMessages"
        v-if="conversationHistory && conversationHistory.length > 0"
        :class="['chatroom__messanges-list', currentConversationMyPermissions.canWrite ? '' : 'chatroom__channel']")

        v-col(v-for="(message, index) in conversationHistory" :key="index" class="pa-0")
          CardNotification(v-if="message.type === 'SEND_NOTIFICATION'" :message="message")
          CardMessage(v-else :message="message" :editMessage.sync="showEditPanel")

      div(v-else class="chatroom__messanges-list chatroom__no-messanges") Write your first message

      v-container(v-if="permissions && permissions.canWrite"
        class="chatroom__send-panel")
        v-avatar(class="send-panel__ava" color="indigo")
          v-img(v-if="currentUser && currentUser.customData.image" :src="require(`@/assets/avatars/${currentUser.customData.image}.png`)")
          v-icon(v-else dark) account_circle
        v-textarea(
          v-model="newMessage"
          class="send-panel__input"
          placeholder="Write a message..."
          @keydown="handleTyping"
          rows="4"
          no-resize
          clearable)
        div(class="send-panel__actions")
          v-btn(v-if="!editedMessageId" @click="handleNewMessage" class="send-panel__btn") Send
          v-btn(v-if="editedMessageId" @click="handleEditMessage" class="send-panel__btn") Edit
          v-btn(v-if="editedMessageId" @click="clearEditMessage" class="send-panel__btn") Cancel
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { namespace, Getter, Mutation } from 'vuex-class';
import CardMessage from '@/components/ui/CardMessage.vue';
import CardNotification from '@/components/ui/CardNotification.vue';
import Confirmation from '@/components/ui/Confirmation.vue';
import { logHelp } from '@/utils';

import InfiniteLoading from 'vue-infinite-loading';
import { User } from '@/types';

const TIME_NOTIFICATION = 10000;

const conversationStore = namespace('conversations');
@Component({
  components: { Confirmation, CardMessage, CardNotification, InfiniteLoading },
})
export default class ChatRoom extends Vue {
  @conversationStore.Getter readonly currentConversationHistory: any;
  @conversationStore.Getter readonly currentConversation: any;
  @conversationStore.Getter readonly currentConversationId: any;
  @conversationStore.Getter readonly currentConversationMyPermissions: any;
  @conversationStore.State readonly conversations: any;
  @conversationStore.State readonly currentUser: any;
  @conversationStore.Getter readonly currentDirectUser: any;
  @conversationStore.State users: User[];

  @conversationStore.Action sendNewMessage: any;
  @conversationStore.Action editMessage: any;
  @conversationStore.Action notifyTyping: any;
  @conversationStore.Action getConversationHistory: any;
  @Getter loading: boolean;
  @Getter scrollToEnd: boolean;
  @Mutation SCROLLING_STOP: any;

  public newMessage: string = '';
  public editedMessageId: string = '';
  public lastTyping: number = 0;

  updated() {
    if (this.scrollToEnd) {
      this.handleScrollToEnd();
    }
  }

  get title() {
    return this.currentConversation.title;
  }

  getUserName(userId: number): string {
    const user = this.users.find((user) => user.userId === Number(userId));
    return (user && user.userName.split('@')[0]) || String(userId);
  }

  get conversationHistory() {
    return this.currentConversationHistory;
  }

  get permissions() {
    return this.currentConversationMyPermissions;
  }

  showEditPanel(message: any) {
    this.newMessage = message.text;
    this.editedMessageId = message.uuid;
  }

  handleNewMessage() {
    this.sendNewMessage(this.newMessage).then(() => {
      this.newMessage = '';
    });
  }

  handleEditMessage() {
    const message = this.currentConversationHistory.find(
      (m: any) => m.uuid === this.editedMessageId,
    );
    this.editMessage({ message, newText: this.newMessage }).then(() => {
      this.clearEditMessage();
    });
  }

  handleTyping() {
    const currentTimeMillis = new Date().getTime();

    if (currentTimeMillis - this.lastTyping >= TIME_NOTIFICATION) {
      this.lastTyping = currentTimeMillis;
      this.notifyTyping();
    }
  }

  clearEditMessage() {
    this.newMessage = '';
    this.editedMessageId = '';
  }

  handleScrollToEnd() {
    logHelp('handleScrollToEnd');
    const container = this.$el.querySelector('#listMessages');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }

    this.SCROLLING_STOP();
  }

  handleScroll(state: any) {
    const initialHeight = this.$el.querySelector('#listMessages').scrollHeight;
    logHelp(initialHeight);

    this.getConversationHistory().then((lastEvent: number) => {
      if (this.currentConversation.lastEvent > 0) {
        state.loaded();
      } else {
        state.complete();
      }

      this.$nextTick(() => {
        logHelp('nextTick');
        this.$el.querySelector('#listMessages').scrollTop =
          this.$el.querySelector('#listMessages').scrollHeight - initialHeight;
      });
    });
  }
}
</script>

<style scoped>
.chatroom__wrapper {
  padding: 48px 0 0;
  flex-direction: column;
  background-color: white;
  height: 100vh;
  overflow: hidden;
}

.chatroom__loading {
}

.chatroom__messanges-list {
  padding: 0 12px 12px;
  overflow-y: auto;
  height: 74vh;
}

.chatroom__channel {
  height: 95vh;
}

.chatroom__no-messanges {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: lighter;
}

.chatroom__send-panel {
  padding-top: 0;
  position: relative;
  padding-bottom: 10px;
  bottom: 0;
  display: flex;
  flex-direction: row;
  background-color: white;
  width: inherit;
  overflow: hidden;
  align-items: flex-end;
}

.send-panel__ava {
  margin-right: 16px;
  margin-bottom: 22px;
  overflow: hidden;
}

.send-panel__input {
  flex-grow: 1;
  overflow: hidden;
}

.send-panel__btn {
  margin-left: 16px;
  margin-bottom: 22px;
  overflow: hidden;
}

.send-panel__actions {
  display: flex;
  flex-direction: column;
}
</style>
