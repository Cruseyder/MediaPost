import {Dao} from '../interfaces/Dao';
import {ApiResponse} from '../interfaces/ApiResponse';
import {Token} from '../helpers/Token';
import {Request} from '../services/Request';
import {Contact} from '../models/Contact';

/**
 * 
 */
export class ContactDao implements Dao<Contact> {

    insert(obj: Contact): Promise<Contact> {
        var fd = new FormData();
        
        fd.append( 'token', Token.getToken());
        fd.append( 'name', obj.name);
        fd.append( 'email', obj.email);
        fd.append( 'phone', obj.phone);

        return new Promise( (resolve, reject) => {
            new Request<ApiResponse<Object>>()
                .request(`salvar`, {
                    method: 'POST',
                    body: fd
                })
                .then( res => res.data )
                .then( (contact: Contact) => resolve( new Contact( contact.name, contact.id, contact.email, contact.phone ) ) )
                .catch( err => {
                    console.log( err );
                    reject( 'Não foi possivel atualizar as informações de contato no momento.' );
                })
        });
    }

    update(obj: Contact): Promise<Contact> {
        var fd = new FormData();

        fd.append( 'token', Token.getToken() );
        fd.append( 'id', obj.id.toString() );
        fd.append( 'name', obj.name );
        fd.append( 'email', obj.email );
        fd.append( 'phone', obj.phone );

        return new Promise( (resolve, reject) => {
            new Request<ApiResponse<Object>>()
                .request(`salvar`, {
                    method: 'POST',
                    body: fd
                })
                .then( res => res.data )
                .then( (contact: Contact) => resolve( new Contact( contact.name, contact.id, contact.email, contact.phone ) ) )
                .catch( err => {
                    console.log( err );
                    reject( 'Não foi possivel atualizar as informações de contato no momento.' );
                })
        });
    }

    delete(id: number) : Promise<string> {
        return new Promise( (resolve, reject) => {
            new Request<ApiResponse<Object>>()
                .request(`excluir?id=${id}&token=${Token.getToken()}`, { method: 'DELETE' })
                .then( res => resolve( 'Contato deletado com sucesso.' ) )
                .catch( err => {
                    console.log(err);
                    reject( 'Não foi possivel excluir o usuário solicitado.')
                });
        })
    }

    getById(id: number): Promise<Contact> {
        return new Promise( (resolve, reject) => {
            new Request<ApiResponse<Object>>()
                .request(`detalhes?id=${id}&token=${Token.getToken()}`)
                .then( res => res.data )
                .then( (contact: Contact) => resolve( new Contact( contact.name, contact.id, contact.email, contact.phone ) ) )
                .catch( err => {
                    console.log(err);
                    reject('Ocorreu um Erro durante a requisição dos dados, por favor tente novamente em poucos instantes.');
                });
        });
    }

    get(page?: number) : Promise<Contact[]> {
        return new Promise( (resolve, reject) => {
            new Request<ApiResponse<Object[]>>()
                .request(`listar?token=${Token.getToken()}&page=${page}`)
                .then( res => res.data )
                .then( (contacts: Contact[]) => resolve( 
                    contacts.map( contact => new Contact(contact.name, contact.id, contact.email, contact.phone ) ) 
                ))
                .catch( err => {
                    console.log(err);
                    reject('Ocorreu um Erro durante a requisição dos dados, por favor tente novamente em poucos instantes.');
                });
        });
    }
}