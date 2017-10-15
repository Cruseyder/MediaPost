export default interface ModalFragments<T> {
    header(model?: T) : string;
    body(model?: T) : string;
    footer(model?: T) : string;
}