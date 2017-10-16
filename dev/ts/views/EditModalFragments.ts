import ModalFragments from '../interfaces/ModalFragments';
import {Contact} from '../models/Contact';

export class EditModalFragments implements ModalFragments<Contact> {
    header(model?: Contact) : string {
        return `
            <h5 class="modal-title">Atualizar Contato</h5>
            <button type="button" class="close oi oi-x" data-dismiss="modal" aria-label="Close">  
            </button>
        `;
    }

    body(model?: Contact) : string {
        return `
            <form data-form="edit">
                <input type="hidden" name="id" id="contact-id" value="${model.id}">
                <div class="form-group">
                    <label for="contact-name">Nome: </label>
                    <input type="text" class="form-control" name="name" id="contact-name" value="${model.name}" >
                </div>
                <div class="form-group">
                    <label for="contact-email">Email: </label>
                    <input type="email" class="form-control" name="email" id="contact-email" value="${model.email}" >
                </div>
                <div class="form-group">
                    <label for="contact-phone">Phone: </label>
                    <input type="text" class="form-control" name="phone" id="contact-phone" value="${model.phone}" >
                </div>
            </form>
        `;
    }

    footer(model?: Contact) : string {
        return `
            <button type="button" class="btn btn-primary" data-confirm="edit">Atualizar</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
        `;
    }
}