import View from './View';

export class MessageView extends View<string> {
    _render(string: string) : string {
        return `<div class="row">${string}</div>`;
    }
}