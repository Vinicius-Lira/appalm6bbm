/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
// import auth from './../middleware/auth';

export default [
    {
        path: '',
        // Relative to /src/views
        name: 'dashboard',
        view: 'Dashboard'
    },
    {
        path: '/cadastro',
        name: 'Cadastro',
        view: 'Cadastros'
    },
    {
        path: '/patrimonio',
        name: 'Patrimônio',
        view: 'Patrimonio'
    },
    {
        path: '/login',
        name: 'Login',
        view: 'Login',
        meta: {
            requiresAuth: true
        }
    }
]
