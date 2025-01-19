/*
  Warnings:

  - A unique constraint covering the columns `[usuario]` on the table `usuarios` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[correo]` on the table `usuarios` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `correo` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `correo` VARCHAR(191) NOT NULL,
    ADD COLUMN `rol` INTEGER NOT NULL DEFAULT 2,
    MODIFY `usuario` VARCHAR(191) NOT NULL,
    MODIFY `pass` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `usuarios_usuario_key` ON `usuarios`(`usuario`);

-- CreateIndex
CREATE UNIQUE INDEX `usuarios_correo_key` ON `usuarios`(`correo`);
