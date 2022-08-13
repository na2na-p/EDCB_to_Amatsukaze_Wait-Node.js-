-- CreateTable
CREATE TABLE "recordHistory" (
    "recId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "recordedPath" TEXT NOT NULL,
    "recordingDateEnd" DATETIME NOT NULL,
    "encodePresetId" INTEGER NOT NULL,
    "isEncoded" BOOLEAN NOT NULL DEFAULT false
);
