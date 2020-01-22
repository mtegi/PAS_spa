import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import {ApiHelper} from "../../utils/API";
import LoadingSpinner from "../../fragments/LoadingSpinner";


class AddFilm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            firstName:'',
            lastName:'',
            title:'',
            release:2020
        };
    }

    handleSubmit = async() => {
        this.setState({loading:true});
        let author = {
            firstname: this.state.firstName,
            lastname: this.state.lastName
        };
        let body = {
            director: author,
            title: this.state.title,
            releaseDate: this.state.release
        };
        if(this.props.modify){
            await ApiHelper.updateFilm(body, this.props.match.params.id).then(() => {
                this.props.history.push('/films')
            }).catch(err => {
                alert(err);
                this.setState({loading: false});
            });
        } else {
            await ApiHelper.addFilm(body).then(() => {
                this.props.history.push('/films')
            }).catch(err => {
                alert(err);
                this.setState({loading: false});
            });
        }
    };

    handleFirstName = (event) => {
        this.setState({firstName:event.target.value})
    };

    handleLastName = (event) => {
        this.setState({lastName:event.target.value})
    };

    handleTitle = (event) => {
        this.setState({title:event.target.value})
    };

    handleRelease = (event) => {
        this.setState({release:event.target.value})
    };

    componentDidMount = async() => {
        if(this.props.modify){
            let response = await ApiHelper.getFilm(this.props.match.params.id);
            this.setState({
                firstName:response.data.director.firstName,
                lastName:response.data.director.lastName,
                title:response.data.title,
                release:response.data.releaseDate
            })
        }
        this.setState({loading:false})
    };


    render() {
        if(this.state.loading){
            return LoadingSpinner();
        }
        return <Container className="justify-items-center mt-3">
            <Form className="justify-items-center bg-items-color grayBorder" onSubmit={(e) => this.handleSubmit(e)}
                  style={{position:"absolute", left:"40%", top:"25%", padding:"1rem"}}>
                <Row>
                    <Col md="auto">
                        <Form.Group>
                            <Form.Label>Directors's firstname</Form.Label>
                            <Form.Control onChange={(e) => this.handleFirstName(e)} type="text" placeholder="Enter name" value={this.state.firstName} required={true}/>
                        </Form.Group>
                    </Col>
                    <Col md="auto">
                        <Form.Group>
                            <Form.Label>Directors's lastname</Form.Label>
                            <Form.Control onChange={(e) => this.handleLastName(e)} type="text" placeholder="Enter last name" value={this.state.lastName} required={true} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md="auto">
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control onChange={(e) => this.handleTitle(e)} type="text" value={this.state.title} placeholder="Enter title" required={true}/>
                        </Form.Group>
                    </Col>
                    <Col md="auto">
                        <Form.Group>
                            <Form.Label>Release date</Form.Label>
                            <Form.Control onChange={(e) => this.handleRelease(e)} type="number" value={this.state.release} placeholder="Enter release date" required={true}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="justify-content-around">
                    <Col md="auto">
                        <Button variant="success" type="submit">
                            Submit
                        </Button>
                    </Col>
                    <Col md="auto">
                        <Link to="/films"><Button variant="warning">Cancel</Button></Link>
                    </Col>
                </Row>
            </Form>
        </Container>
    }
}

export default AddFilm;
