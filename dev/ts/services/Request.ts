import {Service} from '../interfaces/Service';

/**
 * Class Request
 * 
 * Responsável por realizar as requisições para a api da mediapost
 * Implementa a interface Service e faz uso da Interface ContactPartial para tipar a resposta retornada pela api
 */
export class Request<T> implements Service {

    // Atributo privado com o endereço da api
    private _api: string = 'https://www.mediapost.com.br/vagas/dev-frontend/api/';

    private _handleErrors(res: Response): Response {
        if(!res.ok)
            throw new Error(res.statusText);

        return res;
    }

    request(endpoint: string, parans?: RequestInit): Promise<T> {
        return fetch( this._api + endpoint, parans )
                    .then( res => this._handleErrors(res) )
                    .then( res => res.json() );
    }
}

