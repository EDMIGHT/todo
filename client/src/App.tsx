import { CreateTodo } from '@/components/create-todo';
import { Search } from '@/components/search';
import { TodosList } from '@/components/todos-list';

const App = () => {
  return (
    <main className='font-poppins flex justify-center items-center min-h-screen container'>
      <section className='max-w-md w-full space-y-2'>
        <h1 className='text-4xl md:text-5xl font-semibold text-center'>To Do</h1>
        <div className='flex gap-2 md:gap-3 px-1'>
          <Search />
          <CreateTodo />
        </div>
        <TodosList />
      </section>
    </main>
  );
};

export default App;
