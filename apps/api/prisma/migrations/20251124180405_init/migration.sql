-- CreateTable
CREATE TABLE "cv_documents" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "markdownContent" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cv_documents_pkey" PRIMARY KEY ("id")
);
