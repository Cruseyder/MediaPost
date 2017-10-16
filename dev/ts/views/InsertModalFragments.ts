import ModalFragments from '../interfaces/ModalFragments';
import {Contact} from '../models/Contact';

export class InsertModalFragments implements ModalFragments<Contact> {
    header(model?: Contact) : string {
        return `
            <h5 class="modal-title">Adicionar Contato</h5>
            <button type="button" class="close oi oi-x" data-dismiss="modal" aria-label="Close">  
            </button>
        `;
    }

    body(model?: Contact) : string {
        return `
            <form data-form="edit">
                <div class="form-group">
                    <label for="contact-name">Nome: </label>
                    <input type="text" class="form-control" name="name" id="contact-name" >
                </div>
                <div class="form-group">
                    <label for="contact-email">Email: </label>
                    <input type="email" class="form-control" name="email" id="contact-email" >
                </div>
                <div class="form-group">
                    <label for="contact-phone">Phone: </label>
                    <input type="text" class="form-control" name="phone" id="contact-phone" >
                </div>
            </form>
        `;
    }

    footer(model?: Contact) : string {
        return `
            <button type="button" class="btn btn-primary" data-confirm="insert">Adicionar</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
        `;
    }
}