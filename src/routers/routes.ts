import { ComponentProps, ComponentType } from 'react';

import { LayoutAdmin } from '../components/layout/layoutAdmin';
import { LayoutDefault } from '../components/layout/layoutDefault';

import Home from '../screens/home/home';
import Notificacoes from '../screens/notificacao/notificacoes';
import * as MinhaConta from '../screens/minhaConta';

/**
 * Interface de rotas
 * @param {boolean} authRequired - Se a rota precisa de autenticação
 * @param {Component} component - Componente da rota
 * @param {boolean} hasClienteLiberta - Se a rota precisa de autorização Cliente Liberta
 * @param {Component} layout - Componente de estrutura do layout
 * @param {string} routeLabel - Label da rota
 * @param {boolean} showInMenu - Mostra no menu
 */
export interface IRoutes {
    authRequired?: boolean;
    component: ComponentType<ComponentProps<any>> | ComponentType<any>;
    hasClienteLiberta?: boolean;
    layout: ComponentType<ComponentProps<any>> | ComponentType<any>;
    order?: number;
    routeLabel: string;
    showHeader?: boolean;
    showInMenu?: boolean;
}

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
    },
    {
        component: MinhaConta.MinhaContaAjuda,
        layout: LayoutAdmin,
        order: 9,
        routeLabel: 'Ajuda'
    },
    {
        component: MinhaConta.MinhaContaAlmocoGratis,
        layout: LayoutAdmin,
        order: 2,
        routeLabel: 'Almoço Grátis'
    },
    {
        component: MinhaConta.MinhaContaCalculadoras,
        layout: LayoutAdmin,
        order: 6,
        routeLabel: 'Calculadoras'
    },
    {
        component: MinhaConta.MinhaContaClientesLiberta,
        layout: LayoutAdmin,
        order: 8,
        routeLabel: 'Clientes Liberta'
    },
    {
        component: MinhaConta.MinhaContaComparativoCarteira,
        layout: LayoutAdmin,
        order: 7,
        routeLabel: 'Comparativo de Carteira'
    },
    {
        component: MinhaConta.MinhaContaCursos,
        layout: LayoutAdmin,
        order: 1,
        routeLabel: 'Cursos'
    },
    {
        component: MinhaConta.MinhaContaEntrevistas,
        layout: LayoutAdmin,
        order: 5,
        routeLabel: 'Entrevistas'
    },
    {
        component: MinhaConta.MinhaContaLives,
        hasClienteLiberta: true,
        layout: LayoutAdmin,
        routeLabel: 'Lives',
        showInMenu: false
    },
    {
        component: MinhaConta.MinhaContaPlaylists,
        layout: LayoutAdmin,
        order: 4,
        routeLabel: 'Playlists'
    },
    {
        component: MinhaConta.MinhaContaPodcasts,
        layout: LayoutAdmin,
        order: 3,
        routeLabel: 'Podcasts'
    }
];
