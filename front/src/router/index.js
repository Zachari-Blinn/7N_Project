import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';

import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Login from '@/components/auth/Login.vue';
import Secure from '@/components/auth/Secure.vue';
import Register from '@/components/auth/Register.vue';
import CategoryCreate from '@/components/category/Create.vue';
import CategoryShow from '@/components/category/Show.vue';
import CategoryEdit from '@/components/category/Edit.vue';
import ForumCreate from '@/components/forum/Create.vue';
import ForumEdit from '@/components/forum/Edit.vue';
import PartyCreate from '@/components/party/Create.vue';
import TopicCreate from '@/components/topic/Create.vue';

Vue.use(VueRouter);

const routes = [{
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/category/create/:id', //forumId
    name: 'category_create',
    component: CategoryCreate,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/category/edit/:slug',
    name: 'category_edit',
    component: CategoryEdit,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/category/:slugCategory', //forumId
    name: 'category_show',
    component: CategoryShow,
    props: true,
  },
  {
    path: '/forum/create',
    name: 'forum_create',
    component: ForumCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/forum/edit/:id',
    name: 'forum_edit',
    component: ForumEdit,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/topic/create/:categoryId',
    name: 'topic_create',
    component: TopicCreate,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/party/create',
    name: 'party_create',
    component: PartyCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresNotAuth: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      requiresNotAuth: true
    }
  },
  {
    path: '/secure',
    name: 'secure',
    component: Secure,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // Require auth
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  
  // Require isAdmin
  } else if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (store.getters.isAdmin) {
      next()
      return
    }
    next('/login')

  // Require isn't auth
  } else if (to.matched.some(record => record.meta.requiresNotAuth)) {
    if (!store.getters.isLoggedIn) {
      next()
      return
    }
    next('/')
  } else {
    next()
  }
})

export default router;