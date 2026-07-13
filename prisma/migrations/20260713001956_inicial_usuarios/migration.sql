-- CreateEnum
CREATE TYPE "Genero" AS ENUM ('MASCULINO', 'FEMENINO');

-- CreateEnum
CREATE TYPE "SignoZodiacal" AS ENUM ('ARIES', 'TAURO', 'GEMINIS', 'CANCER', 'LEO', 'VIRGO', 'LIBRA', 'ESCORPIO', 'SAGITARIO', 'CAPRICORNIO', 'ACUARIO', 'PISCIS');

-- CreateEnum
CREATE TYPE "EstadoActividad" AS ENUM ('ONLINE', 'DESCONECTADO');

-- CreateEnum
CREATE TYPE "EstadoTransmision" AS ENUM ('LIVE', 'FINALIZADA');

-- CreateTable
CREATE TABLE "Usuario" (
    "IdUsuario" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "edad" INTEGER NOT NULL,
    "biografia" TEXT,
    "peso" DOUBLE PRECISION,
    "altura" DOUBLE PRECISION,
    "nacionalidad" TEXT NOT NULL,
    "genero" "Genero" NOT NULL,
    "ciudad" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "numeroTelefono" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "estadoActividad" "EstadoActividad" NOT NULL DEFAULT 'DESCONECTADO',

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("IdUsuario")
);

-- CreateTable
CREATE TABLE "Interes" (
    "IdInteres" SERIAL NOT NULL,
    "signoZodiacal" "SignoZodiacal",
    "queBusca" TEXT,
    "ubicacion" TEXT,
    "ciudad" TEXT,
    "pais" TEXT,
    "hobby" TEXT,
    "dedicacion" TEXT,
    "UsuarioFK" INTEGER NOT NULL,

    CONSTRAINT "Interes_pkey" PRIMARY KEY ("IdInteres")
);

-- CreateTable
CREATE TABLE "Foto" (
    "IdFoto" SERIAL NOT NULL,
    "urlFoto" TEXT NOT NULL,
    "UsuarioFK" INTEGER NOT NULL,

    CONSTRAINT "Foto_pkey" PRIMARY KEY ("IdFoto")
);

-- CreateTable
CREATE TABLE "Ubicacion" (
    "IdUbicacion" SERIAL NOT NULL,
    "ubicacion" TEXT,
    "ciudad" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "UsuarioFK" INTEGER NOT NULL,

    CONSTRAINT "Ubicacion_pkey" PRIMARY KEY ("IdUbicacion")
);

-- CreateTable
CREATE TABLE "Musica" (
    "IdMusica" SERIAL NOT NULL,
    "nombreCancion" TEXT,
    "tipoMusica" TEXT,
    "UsuarioFK" INTEGER NOT NULL,

    CONSTRAINT "Musica_pkey" PRIMARY KEY ("IdMusica")
);

-- CreateTable
CREATE TABLE "Transmision" (
    "IdTransmision" SERIAL NOT NULL,
    "estado" "EstadoTransmision" NOT NULL DEFAULT 'LIVE',
    "fechaInicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaFin" TIMESTAMP(3),
    "UsuarioFK" INTEGER NOT NULL,

    CONSTRAINT "Transmision_pkey" PRIMARY KEY ("IdTransmision")
);

-- CreateTable
CREATE TABLE "Donacion" (
    "IdDonacion" SERIAL NOT NULL,
    "monto" DECIMAL(10,2) NOT NULL,
    "fechaDonacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UsuarioDonanteFK" INTEGER NOT NULL,
    "UsuarioReceptorFK" INTEGER NOT NULL,
    "TransmisionFK" INTEGER,

    CONSTRAINT "Donacion_pkey" PRIMARY KEY ("IdDonacion")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_numeroTelefono_key" ON "Usuario"("numeroTelefono");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "Interes_UsuarioFK_key" ON "Interes"("UsuarioFK");

-- AddForeignKey
ALTER TABLE "Interes" ADD CONSTRAINT "Interes_UsuarioFK_fkey" FOREIGN KEY ("UsuarioFK") REFERENCES "Usuario"("IdUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Foto" ADD CONSTRAINT "Foto_UsuarioFK_fkey" FOREIGN KEY ("UsuarioFK") REFERENCES "Usuario"("IdUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ubicacion" ADD CONSTRAINT "Ubicacion_UsuarioFK_fkey" FOREIGN KEY ("UsuarioFK") REFERENCES "Usuario"("IdUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Musica" ADD CONSTRAINT "Musica_UsuarioFK_fkey" FOREIGN KEY ("UsuarioFK") REFERENCES "Usuario"("IdUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transmision" ADD CONSTRAINT "Transmision_UsuarioFK_fkey" FOREIGN KEY ("UsuarioFK") REFERENCES "Usuario"("IdUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donacion" ADD CONSTRAINT "Donacion_UsuarioDonanteFK_fkey" FOREIGN KEY ("UsuarioDonanteFK") REFERENCES "Usuario"("IdUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donacion" ADD CONSTRAINT "Donacion_UsuarioReceptorFK_fkey" FOREIGN KEY ("UsuarioReceptorFK") REFERENCES "Usuario"("IdUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donacion" ADD CONSTRAINT "Donacion_TransmisionFK_fkey" FOREIGN KEY ("TransmisionFK") REFERENCES "Transmision"("IdTransmision") ON DELETE SET NULL ON UPDATE CASCADE;
