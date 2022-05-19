<template lang="pug">
  v-container(pa-0)
    v-app-bar(dense absolute style="z-index: 7")
      div(class="chat-bar__main")
        v-app-bar-nav-icon(icon @click="showChatMenu = !showChatMenu")
        v-toolbar-title(class="pl-4") Voxchat
      v-divider(vertical class="mr-3")
      div(v-if="conversation" class="chat-bar__chat")
        div {{title}}&nbsp;&nbsp;&nbsp;
        div(v-if="conversation.direct && currentDirectUser.online" class="chat-bar__online") online&nbsp;&nbsp;&nbsp;
        div(class="flex-grow-1 chat-bar__typing") {{ typing }}


    ChatMenu(:visible.sync="showChatMenu")
    Confirmation(:visibleConfirmation.sync="showConfirmation" :callback="leaveCurrentConversation" nameAction="leave")
    AboutUser(
      :visibleAboutUser.sync="popupAboutUser"
      :user="user"
      :key="'user-'+componentKey")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import ChatMenu from '@/components/ui/ChatMenu.vue';
import Confirmation from '@/components/ui/Confirmation.vue';
import AboutUser from '@/components/ui/AboutUser.vue';
import { logHelp } from '@/utils';

const conversationStore = namespace('conversations');

@Component({
  components: { AboutUser, ChatMenu, Confirmation },
})
export default class ChatBar extends Vue {
  @conversationStore.Getter readonly currentConversation: any;
  @conversationStore.Getter readonly currentConversationUsers: any;
  @conversationStore.Getter readonly currentDirectUser: any;
  @conversationStore.State readonly typingUsers: any;
  @conversationStore.Action leaveCurrentConversation: any;

  public showChatMenu: boolean = false;
  public showConfirmation: boolean = false;
  public popupAboutUser: boolean = false;
  public user: object = {};
  public componentKey: number = 1;

  get conversation() {
    return this.currentConversation;
  }

  get title() {
    return this.currentConversation.direct
      ? this.currentDirectUser.displayName
      : this.currentConversation.title;
  }

  //@ts-ignore
  get typing() {
    if (this.typingUsers.length === 1 && this.currentConversation.direct) {
      return `is typing...`;
    } else if (this.typingUsers.length === 1) {
      return `${this.typingUsers.join(',')} is typing...`;
    } else if (this.typingUsers.length === 2) {
      return `${this.typingUsers.join(' and ')} are typing...`;
    } else if (this.typingUsers.length >= 3) {
      return `${this.typingUsers[0]} and ${
        this.typingUsers.length - 2
      } users are typing...`;
    }
  }
}
</script>

<style scoped>
.chat-bar__main {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 239px;
}

.chat-bar__chat {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
}

.chat-bar__online {
  color: darkgreen;
}

.chat-bar__typing {
  font-weight: lighter;
}
</style>
