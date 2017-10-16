/**
 * Interface DAO
 * 
 * Todas as classes de DAO do sistema deveram implementar a interface
 * Isso garante que todas as DAO possuam os mesmos métodos, porém como cada um será implementado
 * dependera unicamente da DAO em questão.
 */
export interface Dao <T> {
    insert(obj: T) : void;
    update(obj: T) : void;
    delete(id: number) : void;
    getById(id: number) : void;
    get(page?: number) : void;
}