CREATE TABLE `todos` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`title` text(200) NOT NULL,
	`completed` integer DEFAULT false NOT NULL,
	`user_id` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	CONSTRAINT `fk_todos_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`),
	CONSTRAINT "todos_title_not_empty_check" CHECK(length(trim("title")) > 0),
	CONSTRAINT "todos_title_length_check" CHECK(length("title") <= 200)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`name` text(100) NOT NULL,
	`age` integer NOT NULL,
	`email` text(255) NOT NULL UNIQUE,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	CONSTRAINT "users_name_not_empty_check" CHECK(length(trim("name")) > 0),
	CONSTRAINT "users_name_length_check" CHECK(length("name") <= 100),
	CONSTRAINT "users_age_check" CHECK("age" between 0 and 150),
	CONSTRAINT "users_email_not_empty_check" CHECK(length(trim("email")) > 0),
	CONSTRAINT "users_email_length_check" CHECK(length("email") <= 255)
);
