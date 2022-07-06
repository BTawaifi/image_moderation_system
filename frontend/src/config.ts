export default class Config {
    public static API_ROOT_URL = (process.env.REACT_APP_PRODUCTION_URL ? process.env.REACT_APP_PRODUCTION_URL : 'http://localhost:3000/');

    public static backofficeUrl() {
        return this.API_ROOT_URL + 'backoffice/report';
    }
}
