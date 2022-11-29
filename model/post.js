import { v4 as uuidv4 } from 'uuid';

const Post = (title, description, photo=undefined) => {
    let obj = Object.create(postFunctions);
    obj.id = uuidv4();
    obj.title = title;
    obj.description = description;
    obj.photo = photo;
    return obj;
}

const postFunctions = {};

export default Post;