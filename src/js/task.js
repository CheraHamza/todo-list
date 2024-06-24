import { format } from "date-fns";

export default class Task {
	constructor(parentList, name, date, description, status) {
		this.id = Math.floor(Math.random() * 1000000);
		if (parentList === "") {
			this.parentList = "Inbox";
		} else {
			this.parentList = parentList;
		}
		this.name = name;
		this.date = format(new Date(date), "dd MMM yy");
		this.description = description;
		this.checklist = [];
		this.status = status;
		this.deleted = false;
		this.wontdo = false;
	}

	addChecklistItem(item) {
		this.checklist.push(item);
	}

	deleteChecklistItem(index) {
		this.checklist.splice(index, 1);
	}

	getChecklistItemIndexById(id) {
		return this.checklist.findIndex((item) => item.id == id);
	}
}
