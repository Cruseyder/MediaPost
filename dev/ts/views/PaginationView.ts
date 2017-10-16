import View from './View';
import {Contact} from '../models/Contact';

export default class PaginationView extends View<Contact[]> {
    _render(model: Contact[]) : string {
        return `
            <nav aria-label="Páginação da lista de Contatos">
                <ul class="pagination">
                    ${
                        model.map( (contact, index, contacts) => {
                            if( index % 10 == 0 )
                            return `
                                <li class="page-item">
                                    <a class="page-link" href="#">${index / 10 + 1}</a>
                                </li>
                            `
                        }).join('')
                    }
                </ul>
            </nav>
        `;
    }
} 