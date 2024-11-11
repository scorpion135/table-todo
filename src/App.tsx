import './App.css';
import UserTable from '../src/components/usersTable/UserTable'

function App() {

  return (
    <main className="root">
      <div className="container">
        <div className='capture'>
          <h1 className='capture__title'>User To-Do Table</h1>
          <p className='capture__description'>User task table for effective planning</p>
        </div>
        <UserTable/>
      </div>
    </main>
  );
}

export default App;
