PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_todos` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`title` text(200) NOT NULL,
	`completed` integer DEFAULT 0 NOT NULL,
	`user_id` integer NOT NULL,
	CONSTRAINT `fk_todos_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`),
	CONSTRAINT "todos_title_not_empty_check" CHECK(length(trim("title")) > 0),
	CONSTRAINT "todos_title_length_check" CHECK(length("title") <= 200),
	CONSTRAINT "todos_completed_check" CHECK("completed" in (0, 1))
);
--> statement-breakpoint
INSERT INTO `__new_todos`(`id`, `title`, `completed`, `user_id`) SELECT `id`, `title`, `completed`, `user_id` FROM `todos`;--> statement-breakpoint
DROP TABLE `todos`;--> statement-breakpoint
ALTER TABLE `__new_todos` RENAME TO `todos`;--> statement-breakpoint
PRAGMA foreign_keys=ON;