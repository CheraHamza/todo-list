import { format } from "date-fns";

export default class taskController {
	//Tasks
	static Tasks = [];

	static addTask(task) {
		this.Tasks.push(task);
	}

	static removeTask(id) {
		this.Tasks = this.Tasks.filter((task) => task.id !== id);
	}

	static getAllTasks() {
		return this.Tasks.filter(
			(task) =>
				task.status === "Incomplete" &&
				task.deleted === false &&
				task.wontdo === false
		);
	}

	static getTaskByList(list) {
		return this.Tasks.filter(
			(task) =>
				task.parentList === list &&
				task.status === "Incomplete" &&
				task.deleted === false &&
				task.wontdo === false
		);
	}

	static getTaskByDate(date) {
		return this.Tasks.filter(
			(task) =>
				task.date === date &&
				task.status === "Incomplete" &&
				task.deleted === false &&
				task.wontdo === false
		);
	}

	static getTaskByStatus(status) {
		return this.Tasks.filter(
			(task) =>
				task.status === status &&
				task.deleted === false &&
				task.wontdo === false
		);
	}

	static getDeletedTasks() {
		return this.Tasks.filter((task) => task.deleted === true);
	}

	static getWontDoTasks() {
		return this.Tasks.filter(
			(task) => task.wontdo === true && task.deleted === false
		);
	}

	static getTaskById(id) {
		return this.Tasks.find((task) => task.id === id);
	}

	static getTasks(filter) {
		switch (filter) {
			case "All":
				return this.Tasks.filter(
					(task) =>
						task.deleted === false &&
						task.wontdo === false &&
						task.status === "Incomplete"
				);
			case "Today":
				return this.Tasks.filter(
					(task) =>
						task.date === format(new Date(), "dd MMM yy") &&
						task.deleted === false &&
						task.wontdo === false &&
						task.status === "Incomplete"
				);
			case "Tomorrow":
				return this.Tasks.filter(
					(task) =>
						task.date ===
							format(
								new Date(new Date().setDate(new Date().getDate() + 1)),
								"dd MMM yy"
							) &&
						task.deleted === false &&
						task.wontdo === false &&
						task.status === "Incomplete"
				);
			case "Inbox":
				return this.Tasks.filter(
					(task) =>
						task.parentList === "Inbox" &&
						task.deleted === false &&
						task.wontdo === false &&
						task.status === "Incomplete"
				);

			case "Personal":
				return this.Tasks.filter(
					(task) =>
						task.parentList === "Personal" &&
						task.deleted === false &&
						task.wontdo === false &&
						task.status === "Incomplete"
				);

			case "Work":
				return this.Tasks.filter(
					(task) =>
						task.parentList === "Work" &&
						task.deleted === false &&
						task.wontdo === false &&
						task.status === "Incomplete"
				);

			case "Fitness":
				return this.Tasks.filter(
					(task) =>
						task.parentList === "Fitness" &&
						task.deleted === false &&
						task.wontdo === false &&
						task.status === "Incomplete"
				);

			case "Learning":
				return this.Tasks.filter(
					(task) =>
						task.parentList === "Learning" &&
						task.deleted === false &&
						task.wontdo === false &&
						task.status === "Incomplete"
				);

			case "Completed":
				return this.Tasks.filter(
					(task) =>
						task.status === "Completed" &&
						task.deleted === false &&
						task.wontdo === false
				);

			case "Trash":
				return this.Tasks.filter((task) => task.deleted === true);

			case "Won't Do":
				return this.Tasks.filter(
					(task) => task.wontdo === true && task.deleted === false
				);
		}
	}
}
