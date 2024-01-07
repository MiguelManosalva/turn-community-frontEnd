<p align="center">
  <a href="https://reactjs.org/" target="blank"><img src="https://reactjs.org/logo-og.png" width="200" alt="Logo de React" /></a>
</p>

<p align="center">
  <strong>Aplicación de Gestión de Turnos para Comunidades - Frontend</strong><br>
  Construida con <a href="https://reactjs.org/" target="_blank">React</a>, una biblioteca de JavaScript para construir interfaces de usuario.
</p>

## Descripción

Este proyecto representa la parte frontend de la aplicación de gestión de turnos para comunidades de vecinos. Está desarrollado utilizando [React](https://reactjs.org/), una poderosa biblioteca de JavaScript para crear interfaces de usuario de manera eficiente y con una óptima experiencia de usuario.

Características principales:

- Interfaz intuitiva y fácil de usar.
- Visualización de turnos para vecinos y administradores.
- Sistema de notificaciones para recordatorios de turnos.
- Integración segura con el backend de gestión de turnos.

## Preinstalación de PNPM

Antes de instalar las dependencias y ejecutar la aplicación, es crucial tener instalado [PNPM](https://pnpm.io/), un gestor de paquetes rápido, eficiente y que ahorra espacio en disco comparado con `npm`.

### ¿Por qué PNPM?

- **Eficiencia en el Espacio:** PNPM crea un almacén único para todos los módulos y enlaza los módulos necesarios en el `node_modules` de tu proyecto. Esto significa que se duplican menos archivos y se ahorra espacio en disco.
- **Rapidez:** Al utilizar enlaces simbólicos y evitar redundancias, PNPM puede instalar paquetes mucho más rápido que `npm`.
- **Seguridad:** PNPM mantiene la estructura de dependencias plana, lo que evita la sobrecarga de paquetes no deseados y mejora la seguridad del proyecto.

### Instalación de PNPM

Para instalar PNPM, puedes usar el siguiente comando:

```bash
$ npm install -g pnpm
```

## Instalación

```bash
$ pnpm install
```

## Ejecutando la Aplicación

```bash
# Desarrollo
$ pnpm run start

# Modo observación
$ pnpm run start:dev

# Modo producción
$ pnpm run start:prod
```

## Pruebas

```bash
# Pruebas unitarias
$ pnpm run test

# Pruebas e2e
$ pnpm run test:e2e

# Cobertura de pruebas
$ pnpm run test:cov
```
