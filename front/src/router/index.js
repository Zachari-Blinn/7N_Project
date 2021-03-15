import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';

// Pages
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Category from '@/views/Category.vue';

// Component
import Login from '@/components/auth/Login.vue';
import Secure from '@/components/auth/Secure.vue';
import Register from '@/components/auth/Register.vue';

import CategoryCreate from '@/components/category/Create.vue';
import CategoryShow from '@/components/category/Show.vue'

import ForumCreate from '@/components/forum/Create.vue';
import ForumEdit from '@/components/forum/Edit.vue';

import PartyCreate from '@/components/party/Create.vue';

Vue.use(VueRouter);

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/category/create/:id', //forumId
    name: 'Category_create',
    component: CategoryCreate,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/category/:slugCategory', //forumId
    name: 'Category_show',
    component: CategoryShow,
    props: true,
  },
  {
    path: '/forum/create',
    name: 'Forum_create',
    component: ForumCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/forum/edit/:id',
    name: 'Forum_edit',
    component: ForumEdit,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/party/create',
    name: 'Party_create',
    component: PartyCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
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
    name: 'About',
    component: About,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (store.getters.isAdmin) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router;