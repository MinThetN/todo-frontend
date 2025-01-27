import Header from '../components/Header';
import Footer from '../components/Footer';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function Home() {
  
    return (
        <div className='flex flex-col items-center'>
            <Header />
            <TaskForm />
            <TaskList />
            <Footer />
        </div>
    );
}
