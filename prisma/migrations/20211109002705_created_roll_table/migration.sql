-- CreateTable
CREATE TABLE "roll" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "max_number" INTEGER NOT NULL,
    "rolled_number" INTEGER NOT NULL,
    "character_id" INTEGER NOT NULL,
    "rolled_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "roll_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "character" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
