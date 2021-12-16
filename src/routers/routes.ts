import { IRoutes } from '../interface';

import { LayoutAdmin } from '../components/layout/layoutAdmin';
import { LayoutDefault } from '../components/layout/layoutDefault';

import Home from '../screens/home/home';
import Notificacoes from '../screens/notificacao/notificacoes';
import * as MinhaConta from '../screens/minhaConta';

/**
 * Interface de rotas
 * @param {boolean} authRequired - Se a rota precisa de autenticação
 * @param {Component} component - Componente da rota
 * @param {Component} layout - Componente de estrutura do layout
 * @param {string} routeLabel - Label da rota
 * @param {boolean} showInMenu - Mostra no menu
 */

export const routes: IRoutes[] = [
    {
        authRequired: false,
        component: Home,
        layout: LayoutDefault,
        order: 0,
        routeLabel: 'Home'
    },
    {
        authRequired: false,
        component: Notificacoes,
        layout: LayoutDefault,
        routeLabel: 'Notificações',
        showInMenu: false
    },
    // Minha Conta
    {
        component: MinhaConta.MinhaConta,
        layout: LayoutAdmin,
        order: 0,
        routeLabel: 'Minha Conta'
    }
];
