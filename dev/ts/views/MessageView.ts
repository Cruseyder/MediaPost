import View from './View';

export class MessageView extends View<string> {
    close() {
        setTimeout( () => {
            this._element.firstElementChild.classList.remove('fade-in');
            this._element.firstElementChild.classList.add('fade-out');
            this._element.firstElementChild.addEventListener( 'animationend', () => this._element.innerHTML = '' )
        }, 5000 );
    }
    _render(string: string) : string {
        return `<div class="row fade-in">${string}</div>`;
    }
}