import {Dao} from '../interfaces/Dao';
import {ApiResponse} from '../interfaces/ApiResponse';
import {Token} from '../helpers/Token';
import {Request} from '../services/Request';
import {Contact} from '../models/Contact';

/**
 * 
 */
export class ContactDao implements Dao<Contact> {

    insert(obj: Contact) {}

    update(obj: Contact) {}

    delete(id: number) {}

    getById(id: number) {
        return new Promise( (resolve, reject) => {
            new Request<ApiResponse<Object>>()
                .request(`detalhes?id=${id}&token=${Token.getToken()}`)
                .then( res => res.data )
                .then( (contact: Contact) => resolve( new Contact( contact.name, contact.id ) ) )
                .catch( err => {
                    console.log(err);
                    reject('Ocorreu um Erro durante a requisição dos dados, por favor tente novamente em poucos instantes.');
                });
        });
    }

    get() {
        return new Promise( (resolve, reject) => {
            new Request<ApiResponse<Object[]>>()
                .request(`listar?token=${Token.getToken()}`)
                .then( res => res.data )
                .then( (contacts: Contact[]) => resolve( contacts.map( contact => new Contact(contact.name, contact.id ) ) ) )
                .catch( err => {
                    console.log(err);
                    reject('Ocorreu um Erro durante a requisição dos dados, por favor tente novamente em poucos instantes.');
                });
        });
    }
}