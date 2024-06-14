export default class Subtask{

    constructor(){
        this.id =Math.floor(Math.random() * 1000000);
        this.name = '';
        this.status = 'Incomplete';
    }

    setName(name)
    {
        this.name = name;
    }

    setStatus(status)
    {
        this.status = status;
    }
}