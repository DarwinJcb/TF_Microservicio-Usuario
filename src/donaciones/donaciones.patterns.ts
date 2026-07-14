/* tf_microservicio-usuarios/src/donaciones/donaciones.patterns.ts */
export const DONACIONES_PATTERNS = {
  CREAR: 'donaciones.crear',
  LISTAR: 'donaciones.listar',
  LISTAR_POR_DONANTE: 'donaciones.listarPorDonante',
  LISTAR_POR_RECEPTOR: 'donaciones.listarPorReceptor',
  LISTAR_POR_TRANSMISION: 'donaciones.listarPorTransmision',
  BUSCAR_POR_ID: 'donaciones.buscarPorId',
  ACTUALIZAR: 'donaciones.actualizar',
  ELIMINAR: 'donaciones.eliminar',
} as const;
