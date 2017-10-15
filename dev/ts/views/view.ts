/**
 * Class Abstrato View
 * 
 * Usada como base para as demais classes de View, implementa o básico necessário, deixando para suas filhas
 * apenas a responsabilidade de implementar o método _render que gerará a saida html da view
 */
export default abstract class View<T> {

    // Elemento DOM
    private _element: Element;

    /**
     * Recebe um selector css, o cal é usado para selecionar o elemento onde será renderizo o html
     * Armazena esse elemento no atributo privado _element para uso posterior
     * 
     * @param selector seletor css referente ao elemento onde será renderezido o html da view
     */
    constructor(selector: string) {
        this._element = document.querySelector(selector);
    }

    /**
     * Atribui a string de retorno do método _render a propriedade innerHTML do elemento selecionado
     * 
     * @param model Um modelo de dados que será usado pela view para gerar o HTML
     */
    update(model: T) : void {
        this._element.innerHTML = this._render(model);
    }

    /**
     * Retorna uma string que representa o html será injetado dentro do elemento escolhido através de innerHTML
     * s
     * @param model Um modelo de dados que será usado pela view para gerar o html
     */
    abstract _render(model: T): string;
}