<template lang="pug">
  v-container(v-if="currentChat" pa-0)
    v-dialog(
      v-model="visible"
      @click="close"
      persistent
      max-width="500px"
      scrollable
    )
      v-card(class="about-chat__wrapper")
        v-btn(v-if="step !== 1" color="indigo darken-1" @click="step = 1" icon class="about-chat__back")
          v-icon(dark) arrow_back
        v-window(v-model="step")
          v-window-item(:value="1")
            v-card-title(class="px-6")
              v-row(class="about-chat__title-wrapper")
                v-col(cols="2")
                  v-avatar(color="indigo"
                    @click="permissions.isOwner ? chooseAvatar = !chooseAvatar : ''")
                    img(v-if="avatar"
                      :src="require(`@/assets/avatars/${avatar}.png`)")
                    v-icon(v-else dark) supervised_user_circle
                v-col(cols="7" class="about-chat__title pa-0")
                  v-text-field(
                    v-if="permissions.isOwner"
                    class="headline"
                    label="Group name"
                    v-model="title"
                    hide-details
                  )
                  span(v-else class="headline") {{ currentChat.title }}
            v-card-text(class="py-0")
              v-row
                v-col(cols="12" class="py-0")
                  v-text-field(
                    v-model="desc"
                   label="Description"
                   :disabled="!permissions.isOwner"
                   hint="An example of persistent helper text (max 67 symbols)"
                   persistent-hint
                    )
                  v-col(v-if="permissions.isOwner" cols="12" class="about-chat__changes")
                    v-btn(color="indigo darken-1" dark rounded small @click="step = 2; chips = true") Manage members
                    v-btn(color="indigo darken-1" dark rounded small @click="step = 3") Manage admins
                    v-btn(color="indigo darken-1" dark rounded small @click="showPermissions") Edit permissions
                  v-col(cols="12" class="pa-0")
                    ListUsers(:chips="false" :addAdmins="false" :chatUsers="currentConversationUsers" :showUserInfo="showUser")
                  v-card-actions(class="about-chat__actions")
                    div(class="flex-grow-1")
                    v-btn(color="indigo darken-2" text @click="close") Close
                    v-btn(v-if="permissions.isOwner"
                     color="red darken-1" text
                      @click="editCurrentConversation") Save
          v-window-item(:value="2")
            ManageMembers(:close="close" :key="componentKey")
          v-window-item(:value="3")
            ManageAdmins(:close="close" :key="componentKey")
          v-window-item(:value="4")
            EditPermissions(:close="close" :chatPermissions="chatPermissions" :key="componentKey")
    ChooseAvatar(
      :visibleChooseAvatar.sync="chooseAvatar"
      :setAvatar="setAvatar"
      :initialImage="avatar"
      :key="componentKey")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ChooseAvatar from '@/components/ui/ChooseAvatar.vue';
import ListUsers from '@/components/ui/ListUsers.vue';
import ManageMembers from '@/components/ui/ManageMembers.vue';
import { namespace } from 'vuex-class';
import ManageAdmins from '@/components/ui/ManageAdmins.vue';
import EditPermissions from '@/components/ui/EditPermissions.vue';

const conversationStore = namespace('conversations');

@Component({
  components: {
    EditPermissions,
    ManageAdmins,
    ManageMembers,
    ListUsers,
    ChooseAvatar,
  },
})
export default class AboutChat extends Vue {
  @Prop(Boolean) visibleAboutChat: boolean;
  @Prop(Function) showUser: any;
  @conversationStore.Getter readonly currentConversation: any;
  @conversationStore.Getter readonly currentConversationUsers: any;
  @conversationStore.Getter readonly currentConversationMyPermissions: any;
  @conversationStore.Action editConversation: any;

  public chooseAvatar: boolean = false;

  public title: string = '';
  public avatar: string = '';
  public desc: string = '';

  public step: number = 1;
  public chatPermissions = {};
  public componentKey = 1;

  setAvatar(newAvatar: string) {
    this.avatar = newAvatar;
  }

  get currentChat() {
    return this.currentConversation;
  }

  get permissions() {
    return this.currentConversationMyPermissions;
  }

  get visible() {
    if (this.visibleAboutChat) {
      this.avatar = this.currentConversation.customData.image || '';
      this.title = this.currentConversation.title;
      this.desc = this.currentConversation.customData.description || '';
      this.forceRerender();
    }

    if (!this.visibleAboutChat) {
      this.step = 1;
    }

    return this.visibleAboutChat;
  }

  editCurrentConversation() {
    this.editConversation({
      title: this.title,
      customData: {
        image: this.avatar,
        description: this.desc,
      },
    });

    this.close();
  }

  close() {
    this.$emit('update:visibleAboutChat', false);
  }

  forceRerender() {
    this.componentKey += 1;
  }

  showPermissions() {
    this.step = 4;
  }
}
</script>

<style scoped>
.about-chat__wrapper {
  padding: 24px 0;
}

.about-chat__title {
  align-self: center;
}

.about-chat__changes {
  padding: 16px 0 0 0;
  display: flex;
  justify-content: space-between;
}

.about-chat__title-wrapper {
  align-items: flex-end;
  padding: 0;
}

.about-chat__back {
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 10;
}
</style>
