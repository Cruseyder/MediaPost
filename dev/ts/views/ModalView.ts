import View from './View';
import {Contact} from '../models/Contact';

export default class ModalView extends View<Contact> {
    _close(): string {
        return this._element.innerHTML = ``;
    }

    _render(model: Contact): string {
        return `
        <div class="modal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Informações de Contato</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <input type="hidden" name="id" value="${model.id}">
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
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary">Salvar</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}