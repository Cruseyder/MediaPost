import {Dao} from '../interfaces/Dao';
import {ApiResponse} from '../interfaces/ApiResponse';
import {Token} from '../helpers/Token';
import {Request} from '../services/Request';
import {Contact} from '../models/Contact';

/**
 * 
 */
export class ContactDao implements Dao<Contact> {

    insert(obj: Contact) {}

    update(obj: Contact) {}

    delete(id: number) {}

    getById(id: number) {}

    get() {}
}