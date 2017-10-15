import View from './View';
import ModalFragments from '../interfaces/ModalFragments';
import {Contact} from '../models/Contact';

export default class ModalView extends View<Contact> {
    _close(): string {
        return this._element.innerHTML = ``;
    }

    _render(model: Contact, fragments?: ModalFragments<Contact>): string {
        return `
        <div class="modal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        ${fragments.header(model)}
                    </div>
                    <div class="modal-body">
                        ${fragments.body(model)}
                    </div>
                    <div class="modal-footer">
                        ${fragments.footer(model)}
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}