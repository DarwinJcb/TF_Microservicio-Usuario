/* src/usuarios/usuarios.patterns.ts */
export const USUARIOS_PATTERNS = {
  CREAR: 'usuarios.crear',
  LISTAR: 'usuarios.listar',
  BUSCAR_POR_ID: 'usuarios.buscarPorId',
  ACTUALIZAR: 'usuarios.actualizar',
  ELIMINAR: 'usuarios.eliminar',
  VERIFICAR_EXISTENCIA: 'usuarios.verificarExistencia',
  VERIFICAR_DEPENDENCIAS_LOCALES: 'usuarios.verificarDependenciasLocales',
} as const;
