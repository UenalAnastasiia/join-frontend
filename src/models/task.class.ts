export class Task {
    title: string;
    description: string;
    category: string;
    dueDate: number;
    priority: string;
    assignedTo: string;
    status: string;
    id: string;
    bgColor: any;
    editor: any;

    constructor(obj?: any) {
        this.title = obj ? obj.title : '';
        this.description = obj ? obj.description : '';
        this.category = obj ? obj.category : '';
        this.dueDate = obj ? obj.dueDate : '';
        this.priority = obj ? obj.priority : '';
        this.assignedTo = obj ? obj.assignedTo : '';
        this.status = obj ? obj.status : '';
        this.id = obj ? obj.id : '';
        this.bgColor = obj ? obj.bgColor : '';
        this.editor = obj ? obj.editor : '';
    }

    public toJSON() {
        return {
            title: this.title,
            description: this.description,
            category: this.category,
            dueDate: this.dueDate,
            priority: this.priority,
            assignedTo: this.assignedTo,
            status: this.status,
            id: this.id,
            bgColor: this.bgColor,
            editor: this.editor
        }
    }
}