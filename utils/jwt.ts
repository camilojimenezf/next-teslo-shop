import jwt from 'jsonwebtoken';

export const signToken = (_id: string, email: string) => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error('No hay semilla de JWT - Revisar variables de entorno');
  }

  return jwt.sign(
    { _id, email },
    process.env.JWT_SECRET_SEED,
    { expiresIn: '30d' },
  )
}

export const isValidToken = (token: string) : Promise<string> => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error('No hay semilla de JWT - Revisar variables de entorno');
  }

  if (token.length <= 10) {
    return Promise.reject('JWT no es válido');
  }

  return new Promise((resolve, rejected) => {
    try {
      jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
        if (err) return rejected('JWT no es válido');

        const { _id } = payload as { _id: string };
        resolve(_id);
      })
    } catch (err) {
      rejected('JWT no es válido');
    }
  })
}
