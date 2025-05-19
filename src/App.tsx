import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Search from './pages/Search';
import MyPurchases from "./pages/MyPurchases";
import BookDetail from './pages/BookDetail';


export default function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/search"} element={<Search/>}/>
                <Route path={"/myPurchases"} element={<MyPurchases/>}/>
                <Route path="/book/:id" element={<BookDetail />} />
            </Route>
        </Routes>
    </BrowserRouter>
  );
}
