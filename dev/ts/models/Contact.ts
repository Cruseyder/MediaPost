import {ContactDao} from '../daos/ContactDao';

export class Contact {

    private _dao = new ContactDao();

    constructor(
        readonly name: string,
        readonly id?: number,
        readonly email?: string,
        readonly phone?: string
    ){}

    insert(obj: Contact) {
        return this._dao
                .insert(obj);
    }

    update(obj: Contact) {
        return this._dao
                .update(obj);
    }

    delete(id: number) {
        return this._dao
                .delete(id);
    }

    getById(id: number) {
        return this._dao
                .getById(id);
    }

    get(){
        return this._dao
                .get();
    }

}