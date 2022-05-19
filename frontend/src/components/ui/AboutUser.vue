<template lang="pug">
  v-container(class="about-user__wrapper pa-0")
    v-dialog(
      v-model="visible"
      @click="close"
      max-width="500px"
      height="400px"
      persistent
    )
      v-card(class="pa-0")
        v-card-title
          v-row(class="pa-0")
            v-col(cols="2")
              v-avatar(color="indigo" :key="componentKey"
                @click="user.userId === currentUser.userId ? chooseAvatar = !chooseAvatar : ''")
                v-img(v-if="avatar" :src="require(`@/assets/avatars/${avatar}.png`)")
                v-icon(v-else dark) account_circle
            v-col(cols="6" class="about-user__name pa-0")
              span(class="headline") {{ user && user.displayName}}

        v-card-text
          v-container
            v-row(class="pa-0")
              v-col(cols="12" class="pa-0")
                v-textarea(
                  auto-grow
                  rows="1"
                  class="about-user__status"
                  label="Status"
                  v-model="status"
                  :disabled="user && user.userId !== currentUser.userId"
                  :counter="67"
                  :rules="statusRules"
                  hint="Any details such as age, occupation or city (max 67 symbols)"
                  persistent-hint
                  :key="componentKey"
                  )
        v-card-actions(class="about-user__actions")
          div(class="flex-grow-1")
          v-btn(color="indigo darken-1" text @click="close") Close
          v-btn(v-if="user && user.userId === currentUser.userId" color="red darken-1" text @click="editUserCustomData") Save
    ChooseAvatar(
      :visibleChooseAvatar.sync="chooseAvatar"
      :initialImage="avatar"
      :setAvatar="setAvatar"
      :key="componentKey"
      )
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync } from 'vue-property-decorator';
import ChooseAvatar from '@/components/ui/ChooseAvatar.vue';
import { namespace } from 'vuex-class';

const conversationStore = namespace('conversations');

@Component({
  components: { ChooseAvatar },
})
export default class AboutUser extends Vue {
  @Prop(Boolean) visibleAboutUser: boolean;
  @Prop(Object) readonly user: any;
  @conversationStore.State readonly currentUser: any;
  @conversationStore.Action editUser: any;
  @conversationStore.Action getCurrentConversation: any;

  public status: string = '';
  public avatar: string = '';

  public chooseAvatar: boolean = false;
  public componentKey: number = 1;
  public statusRules = [
    (v: string) =>
      v.length <= 67 || 'Status must be not more than 67 characters',
  ];

  setAvatar(newAvatar: string) {
    this.avatar = newAvatar;
  }

  get visible() {
    this.forceRerender();
    return this.visibleAboutUser;
  }

  mounted() {
    if (this.user && this.user.customData) {
      this.status = this.user.customData.status || '';
      this.avatar = this.user.customData.image || '';
    }
  }

  editUserCustomData() {
    this.editUser({
      image: this.avatar,
      status: this.status,
    });

    this.close();
  }

  close() {
    this.$emit('update:visibleAboutUser', false);
  }

  gotoDirect() {
    this.close();
    this.getCurrentConversation(this.user.userId);
  }

  forceRerender() {
    this.componentKey += 1;
  }
}
</script>

<style scoped>
.about-user__name {
  align-self: center;
}

.about-user__wrapper {
  position: absolute;
}
</style>
