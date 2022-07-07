export default class Config {
    public static API_ROOT_URL = (process.env.REACT_APP_BACKEND_HOST ? process.env.REACT_APP_BACKEND_HOST + ':' + process.env.REACT_APP_BACKEND_PORT + '/' : 'http://localhost:3000/');

    public static backofficeUrl() {
        return this.API_ROOT_URL + 'backoffice/report';
    }
}
