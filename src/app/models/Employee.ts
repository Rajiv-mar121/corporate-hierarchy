export class Employee {
    empId: string;
    name: string;
    email?: string;
    position?: string;
    department?: string;
    manager?: string;
    reprting?: string;
    team?: string;

    constructor() {
        this.empId = "";
        this.name = " "
    }
}