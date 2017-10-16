import {Contact} from '../models/Contact';
import {ContactView} from '../views/ContactView';
import ModalView from '../views/ModalView';
import PaginationView from '../views/PaginationView';
import {EditModalFragments} from '../views/EditModalFragments';
import {ViewModalFragments} from '../views/ViewModalFragments';
import {DeleteModalFragments} from '../views/DeleteModalFragments';
import {InsertModalFragments} from '../views/InsertModalFragments';
import {MessageView} from '../views/MessageView';

export default class ContactController {

    private _body: HTMLElement  = document.querySelector('body');
    private _contactModel       = new Contact('');
    private _contactView        = new ContactView('.root');
    private _modelView          = new ModalView('.modals');
    private _messageView        = new MessageView('.messages');
    private _paginationView     = new PaginationView('.pag');
    
    constructor(){
        
        // Inicializa a listagem de contatos
        this._contactModel.get(1).then( contacts => this._contactView.update( contacts ) );

        // Inicializa a paginação passando todos os contatos cadastrados
        this._contactModel.get().then( contacts => this._paginationView.update(contacts) );

        // Adiciona o evento de atualização de contato
        this._body.addEventListener('click', (event) => this.edit(event) );

        // Adiciona o evento que fecha o Modal
        this._body.addEventListener('click', (event) => this.close(event) );

        // Adiciona o evento que renderiza o modal com as informações do contato
        this._body.addEventListener('click', (event) => this.view(event) );

        // Adiciona o evento que renderiza o modal pedindo a confirmação do usuário para deletar o contato
        this._body.addEventListener('click', (event) => this.delete(event) );

        // Adiciona o evento que renderiza o modal para cadastro de novo contato
        this._body.addEventListener('click', (event) => this.insert(event) );

        // Adiciona o evento que faz a exclusão do contato após confirmação do usuario
        this._body.addEventListener('click', (event) => this.onDelete(event) );

        // Adiciona o eveto que atualiza o contato com as novas informações
        this._body.addEventListener('click', (event) => this.onEdit(event) );

        // Adiciona o evento que cria um novo contato
        this._body.addEventListener('click', (event) => this.onInsert(event) );

        // Adiciona o evento que atualiza a listagem de contato conforme a pagina selecionada
        this._body.addEventListener('click', (event) => this.onPaginated(event) );
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

    /**
     * Delegação de evento para o botão de Adicionar
     * 
     * Verifica se o elemento clicado foi o botão de Adicionar
     * Renderiza o modal de Cadastro de novo contato.
     * 
     * @param event Evento do Dom
     */
    insert(event: Event) {
        let target = <HTMLElement>event.target;

        if( target && target.matches( '[data-action="insert"]' ) ) {
            this._modelView.update( this._contactModel, new InsertModalFragments() );
        }
    }

    /**
     * Delegação de evento para o botão de Adicionar
     * 
     * Verifica se o elemento clicado foi o botão de Adicionar
     * Renderiza o modal de Cadastro de novo contato.
     * 
     * @param event Evento do Dom
     */
    onInsert(event: Event) {
        let target = <HTMLElement>event.target;
        let inputName = <HTMLInputElement>document.querySelector('#contact-name');
        let inputEmail = <HTMLInputElement>document.querySelector('#contact-email');
        let inputPhone = <HTMLInputElement>document.querySelector('#contact-phone');

        if( target && target.matches( '[data-confirm="insert"]' ) ) {
            
            // Adiciona o novo contato
            this._contactModel
                .insert(new Contact( inputName.value, null, inputEmail.value, inputPhone.value ) )
                .then( res => 
                    this._messageView.update('<div class="alert alert-success" role="alert">Contato adicionado com sucesso.</div>'))
                .catch( err => 
                    this._messageView.update(`<div class="alert alert-danger" role="alert">${err}</div>`));

            // Fecha o modal
            this._modelView.close();

            // Atualiza a listagem
            this._contactModel.get(1).then( contacts => this._contactView.update( contacts ) );

            // Remove a mensagem após X segundos
            this._messageView.close();
        }  
    }

    /**
     * Delegação de evento para o botão de Deletar
     * 
     * Verifica se o elemento clicado foi o botão de deletar dentro do modal
     * Deleta o contato selecionado.
     * 
     * @param event Evento do Dom
     */
    onDelete(event: Event) {
        let target = <HTMLElement>event.target;
        let targetID: number;

        if( target && target.matches( '[data-confirm="delete"]' ) ) {
            targetID = parseInt( target.dataset.id );
            
            // Deleta o item e apresenta uma mensagem
            this._contactModel.delete(targetID).then( msg => this._messageView.update(msg) );
            // Fecha o modal
            this._modelView.close();
            // Atualiza a listagem
            this._contactModel.get(1).then( contacts => this._contactView.update( contacts ) );

            this._messageView.close();
        }
    }

    /**
     * Delegação de evento para o botão de Atualizar
     * 
     * Verifica se o elemento clicado foi o botão de Atualizar dentro do modal
     * Atualiza os dados do contato conforme informações preenchidaas pelo usuário.
     * 
     * @param event Evento do Dom
     */
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
            this._modelView.close();
            // Atualiza a listagem
            this._contactModel.get(1).then( contacts => this._contactView.update( contacts ) );

            this._messageView.close();
        }
    }

    /**
     * Delegação de evento para os botões de paginação
     * 
     * Verifica se o elemento clicado foi algum botão de paginação
     * Renderiza a lista de contatos conforme a pagina selecionada.
     * 
     * @param event Evento do Dom
     */
    onPaginated(event: Event) {
        event.preventDefault();
        
        let target= <HTMLElement>event.target;
        let page: number;
    
        if( target && target.matches( '.page-link' ) ) {
            page = parseInt(target.textContent);
            this._contactModel.get(page)
                .then( contacts => this._contactView.update(contacts) )
                .catch( err => console.log(err));
        }
    }

    /**
     * Delegação de evento para o botão que fecha o modal
     * 
     * Verifica se o elemento clicado foi o botão que fecha o modal
     * Remove o modal página.
     * 
     * @param event Evento do Dom
     */
    close(event: Event){
        let target = <HTMLElement>event.target;

        if( target && target.matches( '[data-dismiss="modal"]') || target.matches( '[data-dismiss="modal"] > span') ) {
            this._modelView.close();
        }
    }
}