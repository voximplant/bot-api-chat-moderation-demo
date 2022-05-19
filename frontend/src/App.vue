<template lang="pug">
  v-app(id="demo-chat")
    v-container(fill-height class="app__wrapper pa-0")
      ChatBar(v-if="this.$route.name === 'current-chat'")
      v-content(class="app__content" )
        router-view
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ChatBar from '@/components/ui/ChatBar.vue';

import { namespace } from 'vuex-class';
import router from '@/router';
import { storageService } from '@/services/storage.service';
const authStore = namespace('auth');
const botStore = namespace('botStore');

@Component({
  components: { ChatBar },
})
export default class App extends Vue {
  @authStore.Getter readonly accessToken: string;
  @botStore.State readonly adminBasicToken: string;
  @authStore.Getter readonly loginName: string;
  @botStore.Action checkBasicAuthToken: any;

  async created() {
    this.$store.commit('auth/updateAuthError', null, { root: true });

    if (this.$route.name === 'login' || this.$route.name === 'admin-login')
      return;

    if (!this.adminBasicToken && this.$route.name === 'admin') {
      await this.$router.push({ name: 'admin-login' });
      return;
    }

    if (this.adminBasicToken && this.$route.name === 'admin') {
      const isTokenValid = await this.checkBasicAuthToken({
        token: this.adminBasicToken,
      });

      if (!isTokenValid) {
        await this.$router.push({ name: 'admin-login' });
      }
      return;
    }

    if (
      !this.accessToken &&
      this.$route.name !== 'login' &&
      this.$route.name !== 'admin'
    ) {
      const { chatUuid } = router.currentRoute.params;
      if (chatUuid) storageService.setLastConversation(chatUuid);

      await this.$router.push('/login');
    }
  }
}
</script>

<style>
:root {
  --primary-color: #3949ab;
  --light-color: #d7daee;
  --lighter-color: #ebecf6;
  --accent-color: #ab3949;
}
.app__wrapper {
  max-width: none;
  overflow: hidden;
}
.app__content {
  height: 100vh;
  overflow: hidden;
  width: 100%;
}
</style>
