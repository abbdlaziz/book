import './App.css'
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import BooksPage from "./pages/BooksPage.tsx";
import AuthorsPage from "./pages/AuthorsPage.tsx";
import MembersPage from "./pages/MembersPage.tsx";
import BorrowedBooksPage from "./pages/BorrowedBooksPage.tsx";
import MainLayout from "./layout/MainLayout.tsx";
import BookCreatePage from "./pages/BookCreatePage.tsx";
import BookEditPage from "./pages/BookEditPage.tsx";
import AuthorDetailPage from "./pages/AuthorDetailPage.tsx";
import MemberDetailPage from "./pages/MemberDetailPage.tsx";
import AuthorCreatePage from "./pages/AuthorCreatePage.tsx";
import MemberCreatePage from "./pages/MemberCreatePage.tsx";
import BorrowedBookCreatePage from "./pages/BorrowedBookCreatePage.tsx";
import BorrowedBookEditPage from "./pages/BorrowedBookEditPage.tsx";
import MemberEditPage from "./pages/MemberEditPage.tsx";

function App() {
    return (
        <Router>
            <MainLayout>
                <Routes>
                    <Route path="/books" element={<BooksPage/>}/>
                    <Route path="/books/create" element={<BookCreatePage/>}/>
                    <Route path="/books/edit/:id" element={<BookEditPage/>}/>
                    <Route path="/authors" element={<AuthorsPage/>}/>
                    <Route path="/authors/create" element={<AuthorCreatePage/>}/>
                    <Route path="/authors/:id" element={<AuthorDetailPage/>}/>
                    <Route path="/members" element={<MembersPage/>}/>
                    <Route path="/members/create" element={<MemberCreatePage/>}/>
                    <Route path="/members/edit/:id" element={<MemberEditPage/>}/>
                    <Route path="/members/:id" element={<MemberDetailPage/>}/>
                    <Route path="/borrowed" element={<BorrowedBooksPage/>}/>
                    <Route path="/borrowed-books/create" element={<BorrowedBookCreatePage/>}/>
                    <Route path="/borrowed-books/edit/:id" element={<BorrowedBookEditPage/>}/>
                </Routes>
            </MainLayout>
        </Router>
    );
}

export default App;