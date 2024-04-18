import styles from './App.module.css';
import NavBar from './components/NavBar';

import Container from 'react-bootstrap/Container';

import { Route, Switch } from 'react-router-dom';

import './api/axiosDefaults';

import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import EventCreateForm from './pages/events/EventCreateForm';
import EventPage from './pages/events/EventPage';



function App() {
  return (

        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Switch>
              <Route exact path="/" render={() => <h1>Home</h1>} />
              <Route exact path="/signin" render={() => <SignInForm/> } />
              <Route exact path="/signup" render={() => <SignUpForm/> } />
              <Route exact path="/goingon" render={() => <h1>Going On</h1>} />
              <Route exact path="/joining" render={() => <h1>Joining</h1>} />
              <Route exact path="/event/create" render={() => <EventCreateForm/>} />
              <Route exact path="/events/:id" render={() => <EventPage /> } />
              <Route render={ () => <h1>Page Not Found!</h1> } />
            </Switch>
          </Container>
        </div>
  );
}

export default App;