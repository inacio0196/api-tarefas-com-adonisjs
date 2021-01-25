'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Auth
Route.post('/register', 'AuthController.register')
Route.post('/authenticate', 'AuthController.authenticate')

Route.group(() => {
  // Tasks
  Route.get('/tasks', 'TasksController.index')
  Route.get('/tasks/:id', 'TasksController.show')
  Route.put('/tasks/:id', 'TasksController.update')
  Route.post('/tasks', 'TasksController.store')
  Route.delete('/tasks/:id', 'TasksController.delete')
}).middleware('auth')
