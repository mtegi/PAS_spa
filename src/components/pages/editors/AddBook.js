import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import {ApiHelper} from "../../utils/API";
import LoadingSpinner from "../../fragments/LoadingSpinner";


class AddBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            firstName:'',
            lastName:'',
            title:''
        };
    }

    handleSubmit = async() => {
            this.setState({loading:true});
            let author = {
                firstname: this.state.firstName,
                lastname: this.state.lastName
            };
            let body = {
                author: author,
                title: this.state.title
            };
            if(this.props.modify){
                await ApiHelper.updateBook(body, this.props.match.params.id).then(() => {
                    this.props.history.push('/books')
                }).catch(err => {
                    alert(err);
                    this.setState({loading: false});
                });
            } else {
                await ApiHelper.addBook(body).then(() => {
                    this.props.history.push('/books')
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

    componentDidMount = async() => {
        if(this.props.modify){
           let response = await ApiHelper.getBook(this.props.match.params.id);
            this.setState({
                firstName:response.data.author.firstName,
                lastName:response.data.author.lastName,
                title:response.data.title
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
                            <Form.Label>Author's firstname</Form.Label>
                            <Form.Control onChange={(e) => this.handleFirstName(e)} type="text" placeholder="Enter name" value={this.state.firstName} required={true}/>
                        </Form.Group>
                    </Col>
                    <Col md="auto">
                        <Form.Group>
                            <Form.Label>Author's lastname</Form.Label>
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
                </Row>
                <Row className="justify-content-around">
                    <Col md="auto">
                        <Button variant="success" type="submit">
                            Submit
                        </Button>
                    </Col>
                    <Col md="auto">
                        <Link to="/books"><Button variant="warning">Cancel</Button></Link>
                    </Col>
                </Row>
            </Form>
        </Container>
    }
}

export default AddBook;
