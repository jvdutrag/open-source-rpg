-- CreateTable
CREATE TABLE "character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "age" INTEGER,
    "gender" TEXT,
    "player_name" TEXT,
    "current_hit_points" INTEGER NOT NULL DEFAULT 0,
    "max_hit_points" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "character_attributes" (
    "character_id" INTEGER NOT NULL,
    "attribute_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    PRIMARY KEY ("character_id", "attribute_id"),
    CONSTRAINT "character_attributes_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "character" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "character_attributes_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "attribute" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "attribute" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "character_skills" (
    "character_id" INTEGER NOT NULL,
    "skill_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    PRIMARY KEY ("character_id", "skill_id"),
    CONSTRAINT "character_skills_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "character" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "character_skills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "skills" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT
);
