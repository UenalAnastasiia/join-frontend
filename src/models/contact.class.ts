export class Contact {
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
    phone: any;
    color: any;
    id: string;

    constructor(obj?: any) {
        this.first_name = obj ? obj.first_name : '';
        this.last_name = obj ? obj.last_name : '';
        this.full_name = obj ? obj.full_name : '';
        this.email = obj ? obj.email : '';
        this.phone = obj ? obj.phone : '';
        this.color = obj ? obj.color : '';
        this.id = obj ? obj.id : '';
    }

    public toJSON() {
        return {
            first_name: this.first_name,
            last_name: this.last_name,
            full_name: this.full_name,
            email: this.email,
            phone: this.phone,
            color: this.color,
            id: this.id
        }
    }
}