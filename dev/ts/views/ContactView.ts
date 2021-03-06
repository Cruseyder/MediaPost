import View from './View';
import {Contact} from '../models/Contact';

export class ContactView extends View<Contact[]> {
    _render(model: Contact[]) : string {
        return `
        <div class="row">
            <div class="mb-3">
                <button type="button" class="btn btn-primary btn-sm" data-action="insert">
                    Adicionar
                </button>
            </div>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOME</th>
                        <th></th>
                    </tr>
                </thead>
                
                <tbody>
                    ${
                        model.map( contact => 
                            `
                                <tr>
                                    <td>${contact.id}</td>
                                    <td>${contact.name}</td>
                                    <td>
                                        <ul class="list-inline actions text-right">
                                            <li class="list-inline-item view">
                                                <button type="button" class="btn btn-primary oi oi-eye" data-action="view" data-id="${contact.id}" data-tooltip="Visualizar"></button>
                                            </li>
                                            <li class="list-inline-item edit">
                                                <button type="button" class="btn btn-primary oi oi-pencil" data-action="edit" data-id="${contact.id}" data-tooltip="Editar"></button>
                                            </li>
                                            <li class="list-inline-item delete">
                                                <button type="button" class="btn btn-danger oi oi-trash" data-action="delete" data-id="${contact.id}" data-tooltip="Excluir"></button>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                            `
                        ).join('')
                    }
                </tbody>
            </table>
        </div>`;
    }
}