-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "age" INTEGER,
    "gender" TEXT,
    "player_name" TEXT,
    "current_hit_points" INTEGER NOT NULL DEFAULT 0,
    "max_hit_points" INTEGER NOT NULL DEFAULT 0,
    "current_picture" INTEGER NOT NULL DEFAULT 1,
    "is_dead" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_character" ("age", "created_at", "current_hit_points", "gender", "id", "max_hit_points", "name", "player_name") SELECT "age", "created_at", "current_hit_points", "gender", "id", "max_hit_points", "name", "player_name" FROM "character";
DROP TABLE "character";
ALTER TABLE "new_character" RENAME TO "character";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
