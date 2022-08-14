import Overview from 'pages/Overview'
import AddUpdateForm from 'components/AddUpdateForm';
import DetailTransaction from 'pages/DetailTransaction';
import notFound from 'pages/notFound';
import AddUpdateFormDetail from 'components/AddUpdateFormDetail';
import Profile from 'pages/Profile';

const routes = [
  {
    path: '/',
    component: Overview,
    exact: true,
  },
  {
    path: 'overview',
    component: Overview,
    exact: true,
  },
  {
    path: 'profile',
    component: Profile,
    exact: true,
  },
  {
    path: 'update-account/:id',
    component: AddUpdateForm,
    exact: true,
  },
  {
    path: 'detail-account/:id',
    component: DetailTransaction,
    exact: true,
  },
  {
    path: 'update-transaction/:id',
    component: AddUpdateFormDetail,
    exact: true,
  },
  {
    path: 'add-transaction/:id',
    component: AddUpdateFormDetail,
    exact: true,
  },
  {
    path: 'update-account/:id',
    component: AddUpdateForm,
    exact: true,
  },
  {
    path: 'add-account',
    component: AddUpdateForm,
    exact: true,
  },
  {
    path: '*',
    component: notFound,
    exact: false,
  },
]

export default routes
