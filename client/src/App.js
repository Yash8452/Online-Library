import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage';
import About from './pages/About';
import Contact from './pages/Contact'
import Pagenotfound from './pages/PageNotFound';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import UserRoute from './components/routes/UserRoute';
import AdminRoute from './components/routes/AdminRoute'
import AdminDashboard from './pages/admin/AdminDashboard';
import AddBook from './pages/admin/AddBook'
import BookList from './pages/admin/BookList';
import TransactionHistory from './pages/user/TransactionHistory';
function App() {
  return (
    <>
      <Routes>
        


        {/* USER Routes */}
        <Route path='/dashboard/*' element={<UserRoute />}>
          {/* Remove the absolute path for Dashboard */}
          <Route  path='user' element={<TransactionHistory />} />
        </Route>

        {/* ADMIN Routes */}
        <Route path="/dashboard/*" element={<AdminRoute />}>
          <Route  path="admin" element={<AdminDashboard />} />
          <Route  path="admin/add-book" element={<AddBook />} />
          <Route  path="admin/books" element={<BookList />} />
          <Route  path="admin/add-book" element={<AddBook />} />
        </Route>

        <Route path='/' element={<Homepage />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />



        <Route path='*' element={<Pagenotfound />} />
      </Routes>


    </>
  );
}

export default App;
