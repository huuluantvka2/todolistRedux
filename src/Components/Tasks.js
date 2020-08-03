import { v4 as uuidv4 } from 'uuid';
let Tasks = [
    {
        id : uuidv4(),
        name : "React Js",
        status : true
    },
    {
        id : uuidv4(),
        name : "Node Js",
        status : false
    },
    {
        id : uuidv4(),
        name : "AngularJs",
        status : true
    }
]

export default Tasks