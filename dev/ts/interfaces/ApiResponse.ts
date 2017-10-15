/**
 * Interface ApiResponse
 * 
 * Esse interface é apenas usada como placeholder para o retorno da requisição da API
 * Garantindo assim o uso da forte tipagem e do autocomplete proporcionado pelo compilador do typescript.
 */
export interface ApiResponse <T> {
    status: boolean;
    data: T;
    token: string;
}