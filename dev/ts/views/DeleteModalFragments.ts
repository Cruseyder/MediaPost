import ModalFragments from '../interfaces/ModalFragments';
import {Contact} from '../models/Contact';

export class DeleteModalFragments implements ModalFragments<Contact> {
    header(model?: Contact) : string {
        return `
            <h5 class="modal-title">Deletar Contato</h5>
            <button type="button" class="close oi oi-x" data-dismiss="modal" aria-label="Close">
            </button>
        `;
    }

    body(model?: Contact) : string {
        return `
            <p>Tem certeza que deseja deletar o contato - ${model.name}?</p>
            <span class="text-muted">Atenção: Uma vez realizada essa ação não poderá ser desfeita.</span>
        `;
    }

    footer(model?: Contact) : string {
        return `
            <button type="button" class="btn btn-danger" data-confirm="delete" data-id="${model.id}">Deletar</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
        `;
    }
}