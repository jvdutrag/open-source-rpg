-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_character_attributes" (
    "character_id" INTEGER NOT NULL,
    "attribute_id" INTEGER NOT NULL,
    "value" TEXT,

    PRIMARY KEY ("character_id", "attribute_id"),
    CONSTRAINT "character_attributes_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "character" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "character_attributes_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "attribute" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_character_attributes" ("attribute_id", "character_id", "value") SELECT "attribute_id", "character_id", "value" FROM "character_attributes";
DROP TABLE "character_attributes";
ALTER TABLE "new_character_attributes" RENAME TO "character_attributes";
CREATE TABLE "new_character_skills" (
    "character_id" INTEGER NOT NULL,
    "skill_id" INTEGER NOT NULL,
    "value" TEXT,

    PRIMARY KEY ("character_id", "skill_id"),
    CONSTRAINT "character_skills_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "character" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "character_skills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_character_skills" ("character_id", "skill_id", "value") SELECT "character_id", "skill_id", "value" FROM "character_skills";
DROP TABLE "character_skills";
ALTER TABLE "new_character_skills" RENAME TO "character_skills";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
