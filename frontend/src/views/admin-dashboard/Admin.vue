<template lang="pug">
  v-container.pa-0
    v-overlay(v-if="loading" :value="loading" class="chatroom__loading")
      v-progress-circular(indeterminate size="64")

    v-container.pt-16(v-else class="chatroom__wrapper")
      .text-h3.mb-4 Admin dashboard
      v-tabs(v-model="tab")
        v-tab Config
        v-tab Conversations
        v-tab Logs

      v-tabs-items(v-model='tab')
        v-tab-item
          ConfigTab(
            :loading="isUpdatingBlockList"
            :blockList="blockList"
            @update-block-list="onUpdateBlockList"
            @cancel-update-block-list="onCancelUpdateBlockList"
          )
        v-tab-item
          ConversationsTab(:conversations="conversations" :users="users")
        v-tab-item
          LogsTab(:logs="logs" :users="users" :loading="isUpdatingLogs" @update="onUpdateLogs")

</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import ConfigTab from '@/components/Admin/ConfigTab.vue';
import LogsTab from '@/components/Admin/LogsTab.vue';
import { namespace } from 'vuex-class';
import {
  BlockList,
  ConversationLog,
  PairedConversations,
} from '@/types/src/bot';
import ConversationsTab from '@/components/Admin/ConversationsTab.vue';
import { User } from '@/types';

const botStore = namespace('botStore');
const conversationStore = namespace('conversations');

@Component({
  components: {
    ConversationsTab,
    ConfigTab,
    LogsTab,
  },
})
export default class Chat extends Vue {
  private loading = true;
  private isUpdatingBlockList = false;
  private isUpdatingLogs = false;
  private tab: any = null;

  @botStore.Action getBlockList: () => Promise<void>;
  @botStore.Action checkBasicAuthToken: () => Promise<void>;
  @botStore.Action getConversations: () => Promise<void>;
  @botStore.Action getConversationLogs: () => Promise<void>;
  @botStore.Action getUsers: () => Promise<void>;
  @botStore.Action updateBlockList: (params: {
    blockList: BlockList;
  }) => Promise<void>;
  @botStore.Mutation setBlockList: (params: { blockList: BlockList }) => void;
  @botStore.State blockList: BlockList;
  @botStore.State conversations: PairedConversations[];
  @botStore.State logs: ConversationLog[];
  @botStore.State users: User[];

  async onUpdateBlockList(blockList: BlockList) {
    this.isUpdatingBlockList = true;
    await this.updateBlockList({ blockList });
    this.isUpdatingBlockList = false;
  }

  onCancelUpdateBlockList(blockList: BlockList) {
    this.setBlockList({ blockList });
  }

  async onUpdateLogs() {
    this.isUpdatingLogs = true;
    await this.getConversationLogs();
    this.isUpdatingLogs = false;
  }

  async mounted() {
    await this.getUsers();
    await this.getBlockList();
    await this.getConversations();
    await this.getConversationLogs();
    this.loading = false;
  }
}
</script>

<style scoped></style>
