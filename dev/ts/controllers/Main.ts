import {Token} from '../helpers/Token';
import ContactController from '../controllers/ContactController';

export default class Main {
    static init(){
        if(!Token.hasToken)
            Token.generateToken();

        new ContactController();
    }
}