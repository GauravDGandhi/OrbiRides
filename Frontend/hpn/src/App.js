import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import About from './Components/About';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import Home from './Components/Home';
import PlantTree from './Components/PlantTree';
import Service from './Components/Work';
import DisplayRide from './Components/DisplayRide';
import Navbar from './Components/Navbar';
import Login from "./Components/Login";
import RideBook from "./Components/RideBook";
import ProfileSidebar from "./Components/ProfileSidebar";
import Profile from "./Components/Profile";
import RecentRide from "./Components/RecentRide";
import EditProfile from "./Components/EditProfile";
import ProfileLayout from "./Components/ProfileLayout";
import ChangePassword from "./Components/ChangePassword";
import Register from "./Components/Register";
import  Payments from "./Components/Payments";
import PublishRide from "./Components/PublishRide";


function AllPages() {
  return (
    <>
      <Home />
      <About />
      <Service />
      <PlantTree />
      {/* <Contact /> */}
    
    </>
  );
}

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Navbar /> {/* Common Navigation Bar */}

      <Routes>
        {/* Show all components when on the home page */}
        <Route path="/" element={<AllPages />} />

        {/* Show individual pages when navigating */}
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/plant-tree" element={<PlantTree />} />
        <Route path="/contact" element={<Contact />} />
     <Route path="/login" element={< Login/>} />
     <Route path="/display-ride" element={<DisplayRide />} />
     <Route path="/book-ride" element={<RideBook />} />
     <Route path="/register" element={<Register/>} />
     <Route path="/payment" element={<Payments/>} />
     <Route path="/publish" element={<PublishRide/>} />
     <Route path="/profile" element={<ProfileLayout />}>
          <Route index element={<Profile />} /> {/* Default Profile Page */}
          <Route path="edit" element={<EditProfile />} />
          <Route path="recent" element={<RecentRide />} />
          <Route path="change" element={<ChangePassword />} />
        </Route>
      </Routes>

      <Footer /> {/* Common Footer */}
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}