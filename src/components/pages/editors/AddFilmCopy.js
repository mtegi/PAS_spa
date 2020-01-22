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
            filmId:0
        };
    }

    handleSubmit = async() => {
        this.setState({loading:true});
        let body = {
            filmId: this.state.filmId,
        };

        if(this.props.modify){
            await ApiHelper.updateFilmCopy(body, this.props.match.params.id).then(() => {
                this.props.history.push('/film-copies')
            }).catch(err => {
                alert(err);
                this.setState({loading: false});
            });
        } else {
            await ApiHelper.addFilmCopy(body).then(() => {
                this.props.history.push('/film-copies')
            }).catch(err => {
                alert(err);
                this.setState({loading: false});
            });
        }
    };

    handleId = (event) => {
        this.setState({filmId:event.target.value})
    };


    componentDidMount = async() => {
        if(this.props.modify){
            let response = await ApiHelper.getFilmCopy(this.props.match.params.id);
            this.setState({
                    filmId:response.data.filmId
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
                            <Form.Label>Film Id</Form.Label>
                            <Form.Control onChange={(e) => this.handleId(e)} type="number" placeholder="Enter name" value={this.state.filmId} required={true}/>
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
                        <Link to="/film-copies"><Button variant="warning">Cancel</Button></Link>
                    </Col>
                </Row>
            </Form>
        </Container>
    }
}

export default AddCopy;
