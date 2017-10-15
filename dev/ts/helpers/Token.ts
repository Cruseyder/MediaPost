import {Request} from '../services/Request';
import {ApiResponse} from '../interfaces/ApiResponse';

/**
 * Class Token
 * 
 * O uso da api necessita da geração de um token que deve ser enviado em cada requisição em um parametro 'token'
 * Classe responsável por criar e armazenar o token na SessionStorage do navegador toda vez que o sistema for incializado
 */
export class Token {

    static generateToken(){
        new Request<ApiResponse<Object[]>>()
            .request( 'token', { method: 'POST' } )
            .then( res => {
                if( res.token )
                    sessionStorage.setItem( 'token', res.token );
            })
            .catch( err => {
                console.log(err.statusText)

                return 'Falha ao gerar o token de acesso!';
            });
    }

    static hasToken(){
        return window.sessionStorage.getItem('token');
    }

    static getToken() {
        return window.sessionStorage.getItem('token');
    }

}