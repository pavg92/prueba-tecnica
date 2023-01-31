export class Employee {

    id: number;
    name:string;
    type: number;
    active: boolean;

    constructor(
        id: number,
        name: string,
        type: number,
        active: boolean
    ) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.active = active;
    }
    
}