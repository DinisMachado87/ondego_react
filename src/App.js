import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";

import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import EventCreateForm from "./pages/events/EventCreateForm";
import EventPage from "./pages/events/EventPage";
import EventsPage from "./pages/events/EventsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import EventEditForm from "./pages/events/EventEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import EditProfileForm from "./pages/profiles/EditProfileForm";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path='/'
            render={() => (
              <EventsPage message="sorry, couldn't find anything göing ön here. Maybe you can can start an ëvent..? or maybe a book in the sofa?" />
            )}
          />
          <Route
            exact
            path='/goingon'
            render={() => (
              <EventsPage
                message="Sorry, couldn't find anything göing ön here. Maybe you can start an event..?"
                filter={`owner__befriended__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path='/joining'
            render={() => (
              <EventsPage
                message="Sorry, couldn't find anything göing ön here. Maybe you can start an event..?"
                filter={`Joining__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            )}
          />
          <Route
            exact
            path='/signin'
            render={() => <SignInForm />}
          />
          <Route
            exact
            path='/signup'
            render={() => <SignUpForm />}
          />
          <Route
            exact
            path='/event/create'
            render={() => <EventCreateForm />}
          />
          <Route
            exact
            path='/event/:id/edit'
            render={() => <EventEditForm />}
          />
          <Route
            exact
            path='/events/:id'
            render={() => <EventPage />}
          />
          <Route
            exact
            path='/profiles/:id'
            render={() => <ProfilePage />}
          />
          <Route
            exact
            path='/profiles/:id/edit/username'
            render={() => <EditProfileForm />}
          />
          <Route
            exact
            path='/profiles/:id/edit/password'
            render={() => <EditProfileForm />}
          />
          <Route
            exact
            path='/profiles/:id/edit'
            render={() => <EditProfileForm />}
          />
          <Route render={() => <h1>Page Not Found!</h1>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
