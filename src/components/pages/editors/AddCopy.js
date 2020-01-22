import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import {ApiHelper} from "../../utils/API";
import LoadingSpinner from "../../fragments/LoadingSpinner";

class AddCopy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            bookId:0,
            length:null,
            isPaperBook:true,
            pages:0,
            time:''
        };
    }

    handleSubmit = async() => {
        //todo: submit
        this.setState({loading:true});
        let author = {
            lastname: this.state.lastName
        };
        let body = {
            bookId: this.state.bookId,
            author: author,
            title: this.state.title
        };
        if(this.props.modify){
            await ApiHelper.updateCopy(body, this.props.match.params.id).then(() => {
                this.props.history.push('/copies')
            }).catch(err => {
                alert(err);
                this.setState({loading: false});
            });
        } else {
            await ApiHelper.addCopy(body).then(() => {
                this.props.history.push('/copies')
            }).catch(err => {
                alert(err);
                this.setState({loading: false});
            });
        }
    };

    handleId = (event) => {
        this.setState({bookId:event.target.value})
    };

    handleType = (event, isPaperBook) => {
        this.setState({isPaperBook:isPaperBook})
    };

    handleTime = (event) => {
        this.setState({time:event.target.value})
    };

    handlePages = (event) => {
        this.setState({pages:event.target.value})
    };

    componentDidMount = async() => {
        if(this.props.modify){
            let response = await ApiHelper.getCopy(this.props.match.params.id);
            this.setState({
                firstName:response.data.author.firstName,
                lastName:response.data.author.lastName,
                title:response.data.title
            })
        }
        this.setState({loading:false})
    };

    getForm = () => {
        if(this.state.isPaperBook) {
            return <Form.Group>
                <Form.Label>Pages</Form.Label>
                <Form.Control onChange={(e) => this.handlePages(e)} type="number" value={this.state.pages}
                              placeholder="Enter pages" required={true}/>
            </Form.Group>
        }
        else{
            return <Form.Group>
                <Form.Label>Time</Form.Label>
                <Form.Control onChange={(e) => this.handleTime(e)} type="text" value={this.state.time}
                              placeholder="Enter time" required={true}/>
            </Form.Group>
        }
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
                            <Form.Label>Book Id</Form.Label>
                            <Form.Control onChange={(e) => this.handleId(e)} type="number" placeholder="Enter name" value={this.state.bookId} required={true}/>
                        </Form.Group>
                    </Col>
                    <Col md="auto">
                            <Form.Label>Type</Form.Label>
                        <div>
                            <label>PaperBook</label>
                            <input className="form-control" style={{width:"1rem"}} onChange={(e) => this.handleType(e, true)} checked={this.state.isPaperBook} type="radio"/>
                            <label>AudioBook</label>
                            <input className="form-control" style={{width:"1rem"}} onChange={(e) => this.handleType(e, false)} checked={!this.state.isPaperBook}  type="radio"/>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md="auto">
                        {this.getForm()}
                    </Col>
                </Row>
                <Row className="justify-content-around">
                    <Col md="auto">
                        <Button variant="success" type="submit">
                            Submit
                        </Button>
                    </Col>
                    <Col md="auto">
                        <Link to="/copies"><Button variant="warning">Cancel</Button></Link>
                    </Col>
                </Row>
            </Form>
        </Container>
    }
}

export default AddCopy;
