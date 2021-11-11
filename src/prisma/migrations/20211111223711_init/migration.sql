-- CreateTable
CREATE TABLE `character` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `age` INTEGER NULL,
    `gender` VARCHAR(191) NULL,
    `player_name` VARCHAR(191) NULL,
    `current_hit_points` INTEGER NOT NULL DEFAULT 0,
    `max_hit_points` INTEGER NOT NULL DEFAULT 0,
    `current_picture` INTEGER NOT NULL DEFAULT 1,
    `is_dead` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `character_attributes` (
    `character_id` INTEGER NOT NULL,
    `attribute_id` INTEGER NOT NULL,
    `value` VARCHAR(191) NULL,

    PRIMARY KEY (`character_id`, `attribute_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attribute` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `character_skills` (
    `character_id` INTEGER NOT NULL,
    `skill_id` INTEGER NOT NULL,
    `value` VARCHAR(191) NULL,

    PRIMARY KEY (`character_id`, `skill_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `skills` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roll` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `max_number` INTEGER NOT NULL,
    `rolled_number` INTEGER NOT NULL,
    `character_id` INTEGER NOT NULL,
    `rolled_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `character_attributes` ADD CONSTRAINT `character_attributes_character_id_fkey` FOREIGN KEY (`character_id`) REFERENCES `character`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `character_attributes` ADD CONSTRAINT `character_attributes_attribute_id_fkey` FOREIGN KEY (`attribute_id`) REFERENCES `attribute`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `character_skills` ADD CONSTRAINT `character_skills_character_id_fkey` FOREIGN KEY (`character_id`) REFERENCES `character`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `character_skills` ADD CONSTRAINT `character_skills_skill_id_fkey` FOREIGN KEY (`skill_id`) REFERENCES `skills`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `roll` ADD CONSTRAINT `roll_character_id_fkey` FOREIGN KEY (`character_id`) REFERENCES `character`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
