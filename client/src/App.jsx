import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Blog from "./pages/Blog.jsx";
import About from './components/Footer File/About'
import AllBlog from './components/Footer File/AllBlog'
import ContactUs from './components/Footer File/ContactUs'
import ReportAnIssue from './components/Footer File/ReportAnIssue'
import Contribute from './components/Footer File/Contribute'
import JoinCommunity from './components/Footer File/JoinCommunity'
import Privacy_Term from './components/Footer File/Privacy_Term'
import NewsLetter from './components/NewsLetter'
import NoStyleWrapper from './components/NoStyleWrapper'
import Layout from "./pages/admin/Layout.jsx";
import Dasboard from "./pages/admin/Dasboard.jsx";
import AddBlog from "./pages/admin/AddBlog.jsx";
import ListBlog from "./pages/admin/ListBlog.jsx";
import Comments from "./pages/admin/Comments.jsx";
import Login from "./components/admin/Login.jsx";
import 'quill/dist/quill.snow.css';
import { useAppContext } from "./context/AppContext.jsx";

const App = () => {

  const {token} = useAppContext();

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
  <Route path="/about" element={<NoStyleWrapper><About /></NoStyleWrapper>} />
  <Route path="/latest-articles" element={<NoStyleWrapper><AllBlog /></NoStyleWrapper>} />
  <Route path="/categories" element={<NoStyleWrapper><AllBlog /></NoStyleWrapper>} />
  <Route path="/newsletter" element={<NoStyleWrapper><NewsLetter /></NoStyleWrapper>} />
  <Route path="/contact" element={<NoStyleWrapper><ContactUs /></NoStyleWrapper>} />
  <Route path="/report-issue" element={<NoStyleWrapper><ReportAnIssue /></NoStyleWrapper>} />
  <Route path="/donate" element={<NoStyleWrapper><Contribute /></NoStyleWrapper>} />
  <Route path="/privacy-terms" element={<NoStyleWrapper><Privacy_Term /></NoStyleWrapper>} />
  <Route path="/community" element={<NoStyleWrapper><JoinCommunity /></NoStyleWrapper>} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/admin" element={token ? <Layout /> : <Login /> }>
          <Route index element={<Dasboard />} /> 
          <Route path="add-blog" element={<AddBlog />} />
          <Route path="List-blog" element={<ListBlog />} />
          <Route path="comments" element={<Comments />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;