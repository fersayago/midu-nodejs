# API REST
[REST](https://en.wikipedia.org/wiki/Representational_state_transfer) es una arquitectura de software creada en 2000 por Roy Fielding.

## Ventajas de una API REST
- **Simplicidad:** La simplicidad en el diseño y uso de los recursos.
- **Escalabilidad:** Capacidad para crecer y manejar aumentos en la carga de trabajo.
- **Portabilidad:** Puede ser utilizada en diversas plataformas y tecnologías.
- **Visibilidad:** Facilita la supervisión y el seguimiento de las interacciones.
- **Fiabilidad:** Promueve la confiabilidad al utilizar estándares bien definidos.
- **Modificabilidad:** Permite realizar cambios sin afectar a otros componentes.

## Componentes Clave
### Recursos
Los **recursos** son entidades identificables que se acceden a través de URLs.

### Métodos HTTP (Verbos)
Los **métodos HTTP** definen las operaciones que se pueden realizar en los recursos:
- **GET:** Obtener información.
- **POST:** Crear nuevos recursos.
- **PUT:** Actualizar recursos existentes.
- **DELETE:** Eliminar recursos.

### Representaciones
Los **recursos** pueden tener varias **representaciones**, como JSON, XML o HTML. El cliente puede elegir la representación preferida.

### Stateless (Sin Estado)
El principio **stateless** significa que cada solicitud al servidor debe ser completa y no debe depender de solicitudes anteriores. El servidor no mantiene estado sobre el cliente.

### Interfaz Uniforme
La **interfaz uniforme** garantiza que las URLs tengan un significado constante y predecible. Esto simplifica la interacción con la API.

### Separación de Conceptos
La **separación de conceptos** permite que el cliente y el servidor evolucionen de manera independiente, sin afectarse mutuamente.

## Ejemplo de Uso
Supongamos que estamos creando una API REST para administrar una biblioteca. Podríamos tener los siguientes recursos:
- `/libros`
- `/autores`

Utilizaríamos los métodos HTTP para realizar acciones como obtener información sobre un libro específico (GET en `/libros/{id}`), agregar un nuevo libro (POST en `/libros`), actualizar un libro existente (PUT en `/libros/{id}`) o eliminar un libro (DELETE en `/libros/{id}`).

En resumen, una API REST es una forma efectiva y flexible de crear servicios web que siguen principios bien definidos para intercambiar datos y acciones de manera consistente y confiable.

# CORS (Cross-Origin Resource Sharing)

**CORS**, o *Cross-Origin Resource Sharing* (Intercambio de Recursos entre Orígenes), es un mecanismo de seguridad implementado por navegadores web que permite solicitar recursos, como datos o imágenes, desde un dominio diferente de manera controlada.

## Importancia de CORS
CORS resulta fundamental cuando una aplicación alojada en un dominio necesita acceder a recursos ubicados en otro dominio. Sin la implementación de CORS, los navegadores bloquearían estas solicitudes debido a preocupaciones de seguridad, como la prevención de ataques de falsificación de solicitudes entre sitios (CSRF).

## Funcionamiento Básico
Cuando una aplicación intenta obtener recursos desde un dominio diferente, el servidor del dominio de destino debe incluir ciertas cabeceras HTTP en la respuesta. Estas cabeceras especifican qué orígenes están permitidos y qué métodos de solicitud se autorizan. El navegador evalúa estas cabeceras para decidir si permite o bloquea la solicitud.

## Cabeceras Clave
- **`Access-Control-Allow-Origin:`** Define los orígenes permitidos.
- **`Access-Control-Allow-Methods:`** Especifica los métodos de solicitud permitidos.
- **`Access-Control-Allow-Headers:`** Enumera los encabezados permitidos en la solicitud.
- **`Access-Control-Expose-Headers:`** Lista los encabezados que se pueden acceder en la respuesta.
- **`Access-Control-Allow-Credentials:`** Indica si se pueden incluir credenciales en la solicitud.

## Ejemplo Simplificado
Imagina que una aplicación en "https://app.example.com" necesita acceder a recursos desde "https://api.example.com". Para permitir esto, el servidor de la API debe incluir estas cabeceras en sus respuestas:

```
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Methods: GET
Access-Control-Allow-Headers: Content-Type
```
Esto posibilita solicitudes GET seguras desde la aplicación al recurso en la API.

En síntesis, CORS asegura que las solicitudes entre orígenes diferentes se realicen de manera segura y controlada, lo que mejora significativamente la seguridad en la web moderna.