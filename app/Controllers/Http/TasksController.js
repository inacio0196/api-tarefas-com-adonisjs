'use strict'

const Tasks = use('App/Models/Tasks')

class TasksController {
  async index () {
    const tasks = await Tasks.query().with('user').fetch()

    return tasks
  }

  async store ({ request, auth }) {
    const data = request.only(['title', 'description'])
    const task = await Tasks.create({
      user_id: auth.user.id,
      ...data
    })

    return task
  }

  async show ({ params }) {
    const task = await Tasks.findOrFail(params.id)

    return task
  }

  async update ({ params, request }) {
    const data = request.only(['title', 'description'])
    const task = await Tasks.find(params.id)

    task.merge(data)

    await task.save()

    return task
  }

  async delete ({ params, auth, response }) {
    const task = await Tasks.find(params.id)

    if (task.user_id !== auth.user.id) {
      return response.status(401)
    }
    
    await task.delete()
  }
}

module.exports = TasksController
