<template lang="pug">
  v-container(class="pa-0")
    v-navigation-drawer(absolute temporary v-model="visible" @input="$emit('update:visible', visible)")
      v-list-item
        v-list-item-avatar(size="60" color="indigo")
          v-img(v-if="user && user.customData && user.customData.image" :src="require(`@/assets/avatars/${user.customData.image}.png`)")
          v-icon(v-else dark) account_circle
      v-list-item-content
        v-list-item-title(class="chat-menu__username") {{ user.displayName }}
      v-divider
      v-list
        v-list-item(v-for="item in items" :key="item.title" link @click="item.function()")
          v-list-item-icon
            v-icon(class="chat-menu__icon") {{item.icon}}
          v-list-item-content
            v-list-item-title {{ item.title }}
        v-list-item(link @click="logout" class="chat-menu__logout")
          v-list-item-icon
            v-icon exit_to_app
          v-list-item-content
            v-list-item-title Logout
    AboutUser(v-if="user" :visibleAboutUser.sync="popupAboutUser" :user="user" :key="componentKey")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const authStore = namespace('auth');
const conversationStore = namespace('conversations');

@Component({
  components: {
    AboutUser: () => import('@/components/ui/AboutUser.vue'),
  },
})
export default class ChatMenu extends Vue {
  @Prop(Boolean) visible: boolean;
  @authStore.Action logout: any;
  @conversationStore.State readonly currentUser: any;

  public popupNewChat: boolean = false;
  public popupAboutUser: boolean = false;
  public conversationType: string = 'chat';
  public componentKey: number = 1;

  public items = [
    {
      title: 'About',
      icon: 'account_circle',
      function: () => this.showPopupAboutUser(),
    },
  ];

  get user() {
    return this.currentUser;
  }

  async showPopupAboutUser() {
    await this.forceRerender();
    this.visible = !this.visible;
    this.popupAboutUser = !this.popupAboutUser;
  }

  forceRerender() {
    this.componentKey += 1;
  }
}
</script>

<style scoped>
.chat-menu__username {
  padding: 8px 16px 16px;
  font-weight: normal;
  font-size: medium;
}

.chat-menu__logout {
  position: relative;
  bottom: -40vh;
}

.chat-menu__icon {
  color: #3949ab;
}
</style>
