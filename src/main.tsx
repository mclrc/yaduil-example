import { template, defineComponent, makeReactive } from 'yaduil'

const todoTemplate = template(`
	<div><span>{{ props.title }}</span><button :onclick="props.done">Done</button></div>
`)
const Todo = defineComponent(() => todoTemplate)

const App = defineComponent(() => {
	const state = makeReactive({
		todos: ['Take out the trash'],
		newTodoTitle: '',
	})

	const addTodo = () => {
		state.todos.push(state.newTodoTitle)
		state.newTodoTitle = ''
	}

	const removeTodo = idx => {
		state.todos.splice(idx, 1)
	}

	return h => (
		<div>
			<h1>Todo</h1>
			<input type="text"
				value={state.newTodoTitle}
				onChange={e => {
					state.newTodoTitle = e.target.value;
				}} />
			<button onClick={addTodo}>Add</button>
			<ul>
			{state.todos.map((t, idx) => {
					return <li><Todo title={t} done={() => removeTodo(idx)} /></li>
			})}
			</ul>
		</div>
	)
})

new App().mount('#app')
