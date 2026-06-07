import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Booking from './pages/Booking';
import Events from './pages/Events';
import Community from './pages/Community';
import Reviews from './pages/Reviews';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import { CafeProvider } from './context/CafeContext';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <CafeProvider>
      <BrowserRouter>
        <Routes>
          {/* Admin has its own layout (no navbar/footer) */}
          <Route path="/admin" element={<Admin />} />

          {/* All other pages use Layout */}
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/menu"
            element={
              <Layout>
                <Menu />
              </Layout>
            }
          />
          <Route
            path="/booking"
            element={
              <Layout>
                <Booking />
              </Layout>
            }
          />
          <Route
            path="/events"
            element={
              <Layout>
                <Events />
              </Layout>
            }
          />
          <Route
            path="/community"
            element={
              <Layout>
                <Community />
              </Layout>
            }
          />
          <Route
            path="/reviews"
            element={
              <Layout>
                <Reviews />
              </Layout>
            }
          />
          <Route
            path="/profile"
            element={
              <Layout>
                <Profile />
              </Layout>
            }
          />
          <Route
            path="*"
            element={
              <Layout>
                <NotFound />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </CafeProvider>
  );
}
