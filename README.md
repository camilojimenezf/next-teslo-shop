# Next.js Teslo App
Para correr localmente, se necesita la base de datos
```
docker-compose up -d
```

* El -d, significa __detached__

* MongoDB URL Local:
```
mongodb://localhost:27017/teslodb
```

## Configurar variables de entorno
Copiar el archivo __.template.env__ en un archivo llamado __.env__


## Llenar la base de datos con información de pruebas

Llamar a:
```
http://localhost:3000/api/seed
```
