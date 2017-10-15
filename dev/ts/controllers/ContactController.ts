import {Contact} from '../models/Contact';
import {ContactView} from '../views/ContactView';
import ModalView from '../views/ModalView';
import {EditModalFragments} from '../views/EditModalFragments';
import {ViewModalFragments} from '../views/ViewModalFragments';

export default class ContactController {

    private _body: HTMLElement  = document.querySelector('body');
    private _contactModel       = new Contact('');
    private _contactView        = new ContactView('.root');
    private _modelView          = new ModalView('.modals');
    
    constructor(){
        
        // Inicializa a listagem de contatos
        this._contactModel.get().then( contacts => this._contactView.update( contacts ) );

        // Adiciona o evento de atualização de contato
        this._body.addEventListener('click', (event) => this.edit(event) );

        // Adiciona o evento que fecha o Modal
        this._body.addEventListener('click', (event) => this.close(event) );

        this._body.addEventListener('click', (event) => this.view(event) );
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

    view(event: Event) {
        let target = <HTMLElement>event.target;
        let targetID: number;

        if( target && target.matches( '[data-action="view"]' ) ) {
            targetID = parseInt( target.dataset.id );
            this._contactModel.getById(targetID).then( contact => this._modelView.update( contact, new ViewModalFragments() ) );
        }
    }

    close(event: Event){
        let target = <HTMLElement>event.target;

        if( target && target.matches( '[data-dismiss="modal"]') || target.matches( '[data-dismiss="modal"] > span') ) {
            this._modelView._close();
        }
    }
}