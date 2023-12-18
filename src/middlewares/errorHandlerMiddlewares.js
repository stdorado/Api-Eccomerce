export const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ status: 'error', error: 'Error interno del servidor', details: err.message });
  };
  
  const errorsDictionary = [
    { status: 400, message: 'Solicitud incorrecta' },
    { status: 401, message: 'No autorizado, Usuario no encontrado' },
    { status: 403, message: 'Error al agregar un producto al carrito' },
    { status: 404, message: 'Error al eliminar un producto del carrito' },
    { status: 500, message: 'Error interno del servidor' },
    { status: 503, message: 'Servicio no disponible temporalmente' },
  ];
  
  export function handleCustomError(req, res) {
    const randomError = getRandomError();
    res.status(randomError.status).json({ status: "error", error: randomError.message });
  }
  
  function getRandomError() {
    const randomIndex = Math.floor(Math.random() * errorsDictionary.length);
    return errorsDictionary[randomIndex];
  }