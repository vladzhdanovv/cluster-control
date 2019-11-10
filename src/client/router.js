import VueRouter from 'vue-router';
import ServersControl from './components/Control/Servers';
import CommandsControl from './components/Control/Commands';
import SchedulesControl from './components/Control/Schedules';
const routes = [
  {
    path: '/',
    component: ServersControl,
  },
  {
    path: '/commands',
    component: CommandsControl,
  },
  {
    path: '/schedules',
    component: SchedulesControl,
  },
];
const router = new VueRouter({
  routes,
  mode: "history"
});
export default router;
