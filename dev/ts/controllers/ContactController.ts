import {Contact} from '../models/Contact';
import {ContactView} from '../views/ContactView';
import ModalView from '../views/ModalView';
import {EditModalFragments} from '../views/EditModalFragments';
import {ViewModalFragments} from '../views/ViewModalFragments';
import {DeleteModalFragments} from '../views/DeleteModalFragments';
import {MessageView} from '../views/MessageView';

export default class ContactController {

    private _body: HTMLElement  = document.querySelector('body');
    private _contactModel       = new Contact('');
    private _contactView        = new ContactView('.root');
    private _modelView          = new ModalView('.modals');
    private _messageView        = new MessageView('.messages');
    
    constructor(){
        
        // Inicializa a listagem de contatos
        this._contactModel.get().then( contacts => this._contactView.update( contacts ) );

        // Adiciona o evento de atualização de contato
        this._body.addEventListener('click', (event) => this.edit(event) );

        // Adiciona o evento que fecha o Modal
        this._body.addEventListener('click', (event) => this.close(event) );

        this._body.addEventListener('click', (event) => this.view(event) );

        this._body.addEventListener('click', (event) => this.delete(event) );

        this._body.addEventListener('click', (event) => this.onDelete(event) );

        this._body.addEventListener('click', (event) => this.onEdit(event) );
    }

    /**
     * Delegação de evento para o botão de editar
     * 
     * Verifica se o elemento clicado foi o botão de editar, solicita o objeto de Contato refente ao contato que será editado
     * Renderiza a view com os dados selecionado para edição.
     * 
     * @param event Evento do Dom
     */
    edit(event: Event){
        let target = <HTMLElement>event.target;
        let targetID: number;

        if( target && target.matches( '[data-action="edit"]' ) ) {
            targetID = parseInt( target.dataset.id );
            this._contactModel.getById(targetID).then( contact => this._modelView.update( contact, new EditModalFragments() ));
        }
    }

    /**
     * Delegação de evento para o botão de visualizar
     * 
     * Verifica se o elemento clicado foi o botão de visualizar, solicita o objeto de Contato refente ao contato que será editado
     * Renderiza a view com os dados do contato selecionado.
     * 
     * @param event Evento do Dom
     */
    view(event: Event) {
        let target = <HTMLElement>event.target;
        let targetID: number;

        if( target && target.matches( '[data-action="view"]' ) ) {
            targetID = parseInt( target.dataset.id );
            this._contactModel.getById(targetID).then( contact => this._modelView.update( contact, new ViewModalFragments() ) );
        }
    }

    /**
     * Delegação de evento para o botão de Deletar
     * 
     * Verifica se o elemento clicado foi o botão de deletar, solicita o objeto de Contato refente ao contato que será editado
     * Renderiza a view solicitando ao usuário uma confirmação para deletar.
     * 
     * @param event Evento do Dom
     */
    delete(event: Event) {
        let target = <HTMLElement>event.target;
        let targetID: number;

        if( target && target.matches( '[data-action="delete"]' ) ) {
            targetID = parseInt( target.dataset.id );
            this._contactModel.getById(targetID).then( contact => this._modelView.update( contact, new DeleteModalFragments() ) );
        }
    }

    onDelete(event: Event) {
        let target = <HTMLElement>event.target;
        let targetID: number;

        if( target && target.matches( '[data-confirm="delete"]' ) ) {
            targetID = parseInt( target.dataset.id );
            
            // Deleta o item e apresenta uma mensagem
            this._contactModel.delete(targetID).then( msg => this._messageView.update(msg) );
            // Fecha o modal
            this._modelView._close();
            // Atualiza a listagem
            this._contactModel.get().then( contacts => this._contactView.update( contacts ) );
        }
    }

    onEdit(event: Event) {
        let target = <HTMLElement>event.target;
        let targetID: number;
        let inputName = <HTMLInputElement>document.querySelector('#contact-name');
        let inputId   = <HTMLInputElement>document.querySelector('#contact-id' );
        let inputEmail = <HTMLInputElement>document.querySelector('#contact-email');
        let inputPhone = <HTMLInputElement>document.querySelector('#contact-phone');

        if( target && target.matches( '[data-confirm="edit"]' ) ) {
            targetID = parseInt( target.dataset.id );
            
            // 
            this._contactModel.update( 
                new Contact( inputName.value, parseInt(inputId.value), inputEmail.value, inputPhone.value  ) )
                .then( res => this._messageView.update(`<div class="alert alert-success" role="alert">Contato atualizado com sucesso.</div>`) )
                .catch( err => this._messageView.update(`<div class="alert alert-danger" role="alert">${err}</div>`));
            // Fecha o modal
            this._modelView._close();
            // Atualiza a listagem
            this._contactModel.get().then( contacts => this._contactView.update( contacts ) );
        }
    }

    close(event: Event){
        let target = <HTMLElement>event.target;

        if( target && target.matches( '[data-dismiss="modal"]') || target.matches( '[data-dismiss="modal"] > span') ) {
            this._modelView._close();
        }
    }
}