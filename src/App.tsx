import Footer from "./components/layout/footer";
import NavBar from "./components/layout/navbar";
import EventListing from "./features/events/pages/event_listing"

function App() {

  return (
    <>
      <NavBar />
      <EventListing />
      <Footer />
    </>
  );
}

export default App
