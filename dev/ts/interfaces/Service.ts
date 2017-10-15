/**
 * Interface Service
 * 
 * Uma classe de service é responsavel por realizar requisições HTTP para API's externas
 * Todas as classes que realizam requisições deveram implementar a interface Service
 * garantindo assim que todas tenham o método request, porem como implementação dependerá unicamente da classe em si.
 */
export interface Service {
    request(endpoint: string, parans?: RequestInit) : void;
}