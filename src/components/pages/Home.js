import React, {Component} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import {createBrowserHistory} from "history";
import Handle404 from "../404";
import BookList from "./BookList";
import FilmList from "./FilmList";
import CopiesList from "./CopiesList";
import FilmCopyList from "./FilmCopyList";
import AddBook from "./editors/AddBook";
import AddFilm from "./editors/AddFilm";
const history = createBrowserHistory();

class Home extends Component {
    constructor(props) {
        super(props);
        this.state ={
            history:history
        }
    }

    componentDidMount() {
        this.state.history.push('/books');
    }

    render() {
        return (
            <Router>
                <Container fluid={true} style={{height:"fit-content"}}>
                    <Row className="d-flex top-menu">
                        <Col md="auto"><Link to="/books"><Button variant="primary">Books</Button></Link></Col>
                        <Col md="auto"><Link to="/copies"><Button variant="primary">Copies</Button></Link></Col>
                        <Col md="auto"><Link to="/films"><Button variant="primary">Films</Button></Link></Col>
                        <Col md="auto"><Link to="/film-copies"><Button variant="primary">Film Copies</Button></Link></Col>
                    </Row>
                    <Switch>
                        <Route exact path='/books'><BookList/></Route>
                        <Route exact path="/books/add" component={AddBook}/>
                        <Route exact path="/books/edit/:id" render={(routing) => <AddBook match={routing.match} history={routing.history} modify={true}/>}/>
                        <Route exact path='/films'><FilmList/></Route>
                        <Route exact path="/films/add" component={AddFilm}/>
                        <Route exact path="/films/edit/:id" render={(routing) => <AddFilm match={routing.match} history={routing.history} modify={true}/>}/>
                        <Route exact path='/copies'><CopiesList/></Route>
                        <Route exact path='/film-copies'><FilmCopyList/></Route>
                        <Route path='*' exact={true} component={Handle404} />
                    </Switch>
                </Container>
            </Router>
        );
    }
}

export default Home;