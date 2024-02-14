export class Contact {
    firstName: string;
    lastName: string;
    full_name: string;
    email: string;
    phone: any;
    color: any;
    id: string;

    constructor(obj?: any) {
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.full_name = obj ? obj.full_name : '';
        this.email = obj ? obj.email : '';
        this.phone = obj ? obj.phone : '';
        this.color = obj ? obj.color : '';
        this.id = obj ? obj.id : '';
    }

    public toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            full_name: this.full_name,
            email: this.email,
            phone: this.phone,
            color: this.color,
            id: this.id
        }
    }
}