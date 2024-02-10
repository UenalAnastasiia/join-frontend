export class Contact {
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    phone: any;
    bgColor: any;
    id: string;

    constructor(obj?: any) {
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.fullName = obj ? obj.fullName : '';
        this.email = obj ? obj.email : '';
        this.phone = obj ? obj.phone : '';
        this.bgColor = obj ? obj.bgColor : '';
        this.id = obj ? obj.id : '';
    }

    public toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            fullName: this.fullName,
            email: this.email,
            phone: this.phone,
            bgColor: this.bgColor,
            id: this.id
        }
    }
}