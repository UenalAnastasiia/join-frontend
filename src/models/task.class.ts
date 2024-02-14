export class Task {
    title: string;
    description: string;
    category: string;
    due_date: any;
    priority: string;
    assigned_to: string;
    status: string;
    id: string;
    color: any;
    editor: any;

    constructor(obj?: any) {
        this.title = obj ? obj.title : '';
        this.description = obj ? obj.description : '';
        this.category = obj ? obj.category : '';
        this.due_date = obj ? obj.due_date : '';
        this.priority = obj ? obj.priority : '';
        this.assigned_to = obj ? obj.assigned_to : '';
        this.status = obj ? obj.status : '';
        this.id = obj ? obj.id : '';
        this.color = obj ? obj.color : '';
        this.editor = obj ? obj.editor : '';
    }

    public toJSON() {
        return {
            title: this.title,
            description: this.description,
            category: this.category,
            due_date: this.due_date,
            priority: this.priority,
            assigned_to: this.assigned_to,
            status: this.status,
            id: this.id,
            color: this.color,
            editor: this.editor
        }
    }
}