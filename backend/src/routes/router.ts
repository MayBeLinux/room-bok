// Routage des differentes routes de l'application


// TODO 
// - [ ] Ajouter les routes pour les vues après finalisation de UI
//          - Home
//          - Dashboard
//          - Login
//          - Register
//          - Application Information ( Version / Stack / Description )
// - [ ] udpate le router pour les futures routes

import { createRouter, createWebHistory } from 'vue-router'

// En dessous les routes resten en mode commentaire car le frontend n'est pas
// encore builder !

// import Home from '../../../frontend/src/views/Home.vue' <-- Page principale
// import NotFound from '../../../frontend/src/views/NotFound.vue' <-- Page non trouvé 
// import About from '../../../frontend/src/views/About.vue <-- Information de l'application
// import Dashboard from '../../../frontend/src/views/Dashboard.vue <-- Dashboard principale (zone de booking pour tous les users)

// Déclaration des routes de l'application
// Suivre le TODO 
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/404',
        name: 'NotFound',
        component: NotFound
    },
    {
        path: '/about',
        name: 'About Application',
        component: About
    },
    {
        path: '/dashboard',
        name: 'Dashboard Reservation Salle',
        component: Dashboard
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
});