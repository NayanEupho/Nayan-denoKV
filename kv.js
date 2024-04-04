const KV = await Deno.openKv("https://api.deno.com/databases/8ccf2615-c7c4-4fa9-9dfb-5cc6d4270efe/connect");

const key1 = ['stuent','NAYAN']
const value1 = 21;
await KV.set(key1,value1)

const key2 = ['student', 'abc']
const value2 = 20;
await KV.set(key2,value2)

const key3 = ['student', 'XYZ']
const value3 = 20;
await KV.set(key3,value3)

const key4 = ['student', 'xyz']
const value4 = 20;
await KV.set(key4,value4)

const key5 = ['student', 'wasd']
const value5 = 20;
await KV.set(key5,value5)

// const key =  ['stuent','NAYAN']
// const data = await KV.get(key)
// console.log(data)

const list = await KV.list({
    prefix: ["student"],
},
);

for await (const {key, value} of list){
    console.log(key, value);
}

class Student_class_obj{
    constructor(name, std, roll_no, age, gender, address){
        this.name = name;
        this.class = std;
        this.roll_no = roll_no;
        this.age = age;
        this.gender = gender;
        this.address = address;
    }
}

let name;
let age;
let student_1 = {
    name: "xyz",
    class: "classA",
    roll_no: 1,
    age: 20,
    gender: "M",
    address: "location A"
}

export async function addStudent(Student){
    let key = ['student', `${Student.class}`, `${Student.roll_no}`];
    let value = Student;
    await KV.set(key, value);
}

export async function delStudent(class_name, id){
    let key = ['student', `${class_name}`, `${id}`];
    await KV.delete(key);
}

export async function updateStudent(Student, id){
    let key = ['student', `${Student.class}`, `${Student.roll_no}`];
    let new_value = await KV.get(key)
    new_value.roll_no = id;
    await KV.set(key, new_value);
}

export async function getStudent(class_name, id){
    let key = ['student', `${class_name}`, `${id}`];
    let result = await KV.get(key);
    return result.value;
}

await addStudent(student_1);
await updateStudent(student_1, 2);