import React, {Component} from 'react'
import Button from 'react-bootstrap/Button';
import BasicTable from "../fragments/BasicTable";
import {Link} from "react-router-dom";
import LoadingSpinner from "../fragments/LoadingSpinner";
import ApiHelper from "../utils/API";
import Container from "react-bootstrap/Container";
import Error from "../fragments/Error"
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class BookList extends Component {
    constructor(props) {
        super(props);
        this.state ={
            error:null,
            loading:true,
            books: [],
            columns: [{
                Header: 'Title',
                accessor: 'title'
            }, {
                id: 'author',
                Header: 'Author',
                accessor: d => d.author.firstName +' '+ d.author.lastName
            },{
                id: 'action',
                Header: 'Menu',
                Cell: table => {
                    let path = '/books/edit/' + table.row.original.id;
                    return (
                        <Row className="justify-content-md-center">
                            <Col md="auto">
                                <Link to={path}><Button variant="primary">Edit</Button></Link>
                            </Col>
                            <Col md="auto">
                            <Button className="ml-1" data-id={table.row.original.id} variant="danger" onClick={this.deleteItem}>&#128465;</Button>
                            </Col>
                        </Row>
                    )
                }
            }]
        }
    }

    deleteItem = async (event) => {
        let idToDel = event.target.attributes['data-id'].value;
        event.preventDefault();
        this.setState({loading:true});
        await ApiHelper.deleteBook(idToDel).then(this.fetch).catch((e)=>alert(e)).finally(()=>this.setState({loading:false}))
    };


    fetch = async() => {
        return ApiHelper.getBooks().then( response =>{
            this.setState({
                books: response.data,
                loading:false,
            })}
        )
    };

    componentDidMount = async () => {
        await this.fetch().catch(e =>
            {
                console.log(e);
                this.setState({
                    loading:false,
                    error:true
                })
            }
        )
    };

    getBody = () => {
        if(this.state.books.length ===  0)
            return <span className="noTests">No books</span>;
        return <BasicTable
            data={this.state.books}
            columns={this.state.columns}
        />
    };

    render() {
        if(this.state.loading){
            return LoadingSpinner();
        }
        else if(this.state.error){
            return Error();
        }
        return <Container className="grayBorder bg-items-color m1rem p_d" style={{height:"100%"}}>
            <Row className="m-2"><Link to="/books/add"><Button>New Book</Button></Link></Row>
            {this.getBody()}
        </Container>
    }
}

export default BookList;