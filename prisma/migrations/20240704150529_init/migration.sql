-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector";

-- CreateTable
CREATE TABLE "Cache" (
    "id" TEXT NOT NULL,
    "orgId" UUID NOT NULL,
    "botId" UUID NOT NULL,
    "question" TEXT NOT NULL,
    "questionEmbedding" vector,
    "answer" TEXT NOT NULL,

    CONSTRAINT "Cache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cache_question_key" ON "Cache"("question");

-- CreateIndex
CREATE INDEX "Cache_questionEmbedding_idx" ON "Cache"("questionEmbedding");
