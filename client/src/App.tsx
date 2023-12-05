import { TodosList } from '@/components/todos-list';

const App = () => {
  return (
    <div className='font-poppins flex justify-center items-center min-h-screen container'>
      <section className='max-w-md w-full space-y-2'>
        <h1 className='text-4xl md:text-5xl font-semibold text-center'>To Do</h1>
        <TodosList />
      </section>
    </div>
  );
};

export default App;
