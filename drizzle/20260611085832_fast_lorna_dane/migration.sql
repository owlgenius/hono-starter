PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`name` text(100) NOT NULL,
	`age` integer NOT NULL,
	`email` text(255) NOT NULL UNIQUE,
	CONSTRAINT "users_name_not_empty_check" CHECK(length(trim("name")) > 0)
);
--> statement-breakpoint
INSERT INTO `__new_users`(`id`, `name`, `age`, `email`) SELECT `id`, `name`, `age`, `email` FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
PRAGMA foreign_keys=ON;