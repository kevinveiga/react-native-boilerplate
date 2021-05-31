export interface RouteParams {
    id?: string;
    routeName?: string;
    routeParams?: Record<string, unknown>;
    routeToRedirect?: string;
    title?: string;
}
