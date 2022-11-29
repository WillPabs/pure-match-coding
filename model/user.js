import { v4 as uuidv4 } from 'uuid';

const User = (name, email, password) => {
    let obj = Object.create(userFunctions);
    obj.id = uuidv4();
    obj.name = name;
    obj.email = email;
    obj.password = password;
    return obj;
}

const userFunctions = {

};

export default User;