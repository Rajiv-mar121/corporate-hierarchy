export class Employee {
    id?: number;
    name: string;
    designation?: string;
    email?: string;
    department?: string;
    team?: string;
    manager_id?: string;
    manager_name?: string;

    constructor() {
        this.name = " "
    }
}