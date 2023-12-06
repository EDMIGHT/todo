import { Search } from '@/components/search';
import { TodosList } from '@/components/todos-list';
import { Icons } from '@/components/ui/icons';

const App = () => {
  return (
    <main className='font-poppins flex justify-center items-center min-h-screen container'>
      <section className='max-w-md w-full space-y-2'>
        <h1 className='text-4xl md:text-5xl font-semibold text-center'>To Do</h1>
        <div className='flex gap-2 md:gap-3 px-1'>
          <Search />
          <button>
            <Icons.plus className='w-7 h-7' />
          </button>
        </div>
        <TodosList />
      </section>
    </main>
  );
};

export default App;
