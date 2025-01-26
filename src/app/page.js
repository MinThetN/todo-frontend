import Header from '../components/Header';
import Footer from '../components/Footer';
import TaskForm from '../components/TaskForm';

export default function Home() {
  
    return (
        <div className='flex flex-col items-center'>
            <Header />
            <TaskForm />
            <Footer />
        </div>
    );
}
