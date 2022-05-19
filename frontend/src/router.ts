import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login.vue';
import Chat from '@/views/Chat.vue';
import ChatRoom from '@/views/ChatRoom.vue';
import Admin from '@/views/admin-dashboard/Admin.vue';
import AdminLogin from '@/views/admin-dashboard/AdminLogin.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'chat',
      component: Chat,
    },
    {
      path: '/chat/:chatUuid',
      name: 'current-chat',
      component: ChatRoom,
    },
    { path: '/login', name: 'login', component: Login },
    { path: '/admin', name: 'admin', component: Admin },
    { path: '/admin/login', name: 'admin-login', component: AdminLogin },
  ],
});

export default router;
