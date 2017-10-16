import View from './View';
import ModalFragments from '../interfaces/ModalFragments';
import {Contact} from '../models/Contact';

export default class ModalView extends View<Contact> {
    close() {
        this._element.firstElementChild.classList.remove('fade-in');
        this._element.firstElementChild.classList.add('fade-out');

        this._element.firstElementChild.addEventListener('animationend', () => this._element.innerHTML = `` );
    }

    _render(model: Contact, fragments?: ModalFragments<Contact>): string {
        return `
        <div class="modal fade-in">
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