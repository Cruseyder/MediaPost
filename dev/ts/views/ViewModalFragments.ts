import ModalFragments from '../interfaces/ModalFragments';
import {Contact} from '../models/Contact';

export class ViewModalFragments implements ModalFragments<Contact> {
    header(model?: Contact) : string {
        return `
            <h5 class="modal-title">Informações de Contato</h5>
            <button type="button" class="close oi oi-x" data-dismiss="modal" aria-label="Close">
            </button>
        `;
    }

    body(model?: Contact) : string {
        return `
            <ul class="list-group">
                <li class="list-group-item unbordered">Nome: ${model.name}</li>
                <li class="list-group-item unbordered">Email: ${model.email}</li>
                <li class="list-group-item unbordered">Telefone: ${model.phone}</li>
            </ul>
        `;
    }

    footer(model?: Contact) : string {
        return `
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
        `;
    }
}