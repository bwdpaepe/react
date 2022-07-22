import './App.css';
import TodoItem from './components/TodoItem';
import TODO_ITEMS from './mock-data';

function App() {
  return (
    <div className="App">
      {TODO_ITEMS.map(todo =>
      <TodoItem text={todo.text} description={todo.description} done={todo.done}/>)
      }
    </div>
  );
}

export default App;
