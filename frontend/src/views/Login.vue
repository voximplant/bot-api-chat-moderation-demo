<template lang="pug">
  v-container(fill-height fluid)
    v-alert(v-if="authError" type="error" dismissible class="login-page__error") {{authError}}. Please try again
    v-row(align="center" justify="center")
      v-col(cols="12" sm="8" md="4")
        v-card.elevation-5
          v-toolbar(color="primary" dark flat)
            v-toolbar-title Sign in
            div.flex-grow-1
            v-tooltip(right)
              template(v-slot:activator="{ on }")
                v-btn(icon large href="https://manage.voximplant.com/auth" target="_blank" v-on="on")
                  v-icon info
              span Don't have an account? Sign up
          v-card-text
            v-form
              v-text-field(
                v-model="loginForm.user"
                label="User" name="username"
                prepend-icon="person"
                type="text"
                :autofocus="!loginName"
                clearable
                )
              v-text-field(
                v-model="loginForm.password"
                id="password"
                label="Password"
                name="password"
                prepend-icon="lock"
                :type="visiblePassword ? 'text' : 'password'"
                :append-icon="visiblePassword ? 'visibility' : 'visibility_off'"
                @click:append="visiblePassword = !visiblePassword"
                :autofocus="!!loginForm.user"
              )
              v-checkbox(
                v-model="loginForm.rememberMe"
                label="Remember me"
                color="primary"
                )
            v-card-actions
              div.flex-grow-1
              v-btn(
                color="primary"
                :disabled="!loginForm.user || !loginForm.password"
                @click="handleSubmit"
                @keyup.enter="handleSubmit"
                ) Sign in
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { LoginForm } from '@/types/src/auth';

const authStore = namespace('auth');

@Component
export default class Auth extends Vue {
  @authStore.State authError: string;
  @authStore.Getter loginName!: string;
  @authStore.Getter rememberData!: boolean;
  @authStore.Action login: any;

  private loginForm: LoginForm = {
    user: '',
    password: '',
    rememberMe: true,
  };

  private visiblePassword: boolean = false;
  private error: string = '';

  mounted() {
    this.loginForm = {
      user: this.loginName || '',
      password: '',
      rememberMe: this.rememberData || true,
    };

    this.visiblePassword = false;
    this.error = this.authError;
  }

  handleSubmit() {
    this.login(this.loginForm);
  }
}
</script>

<style scoped>
.login-page__error {
  position: absolute;
  top: 70px;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
