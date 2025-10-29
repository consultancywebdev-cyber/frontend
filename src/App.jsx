import { Switch, Route } from 'wouter';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { Toaster } from './ui/toaster';
import Home from './pages/HomePage';
import UniversitiesPage from './pages/UniversitiesPage';
import CoursesPage from './pages/CoursesPage';
import DestinationsPage from './pages/DestinationsPage';
import ClassesPage from './pages/ClassesPage';
import BlogsPage from './pages/BlogsPage';
import Other from './pages/OtherPage'
import About from './pages/AboutPage';
import AppointmentPage from './pages/AppointmentPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/Dashboard';
import Settings from './pages/admin/Settings';
import Sliders from './pages/admin/Sliders';
import NotFound from './pages/not-found';
import Universities from './pages/admin/Universities';
import Courses from './pages/admin/Courses';
import Destinations from './pages/admin/Destinations';
import Classes from './pages/admin/Classes';
import Blogs from './pages/admin/Blogs';
import Reviews from './pages/admin/Reviews';
import Appointments from './pages/admin/Appointments';
function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/universities" component={UniversitiesPage} />
      <Route path="/courses" component={CoursesPage} />
      <Route path="/destinations" component={DestinationsPage} />
      <Route path="/classes" component={ClassesPage} />
      <Route path="/blogs" component={BlogsPage} />
      <Route path="/about" component={About} />
      <Route path="/other" component={Other} />
      <Route path="/appointment" component={AppointmentPage} />
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/settings" component={Settings }/>
           <Route path="/admin/sliders" component={Sliders }/>
           <Route path="/admin/universities" component={Universities }/>
           <Route path="/admin/courses" component={Courses }/>
           <Route path="/admin/destinations" component={Destinations }/>
            <Route path="/admin/classes" component={Classes }/>
            <Route path="/admin/blogs" component={Blogs }/>
            <Route path="/admin/reviews" component={Reviews }/>
            <Route path="/admin/appointments" component={Appointments }/>
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}
