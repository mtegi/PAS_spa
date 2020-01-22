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

class FilmCopyList extends Component {
    constructor(props) {
        super(props);
        this.state ={
            error:null,
            loading:true,
            copies: [],
            columns: [{
                id: 'id',
                Header: 'Id',
                accessor: d => d.id
            },{
                Header: 'Title',
                accessor: 'title'
            },{
                id: 'author',
                Header: 'Author',
                accessor: d => d.entity.director.firstName +' '+ d.entity.director.lastName
            },{
                id: 'action',
                Header: 'Menu',
                Cell: table => {
                    let path = '/film-copies/edit/' + table.row.original.id;
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
        await ApiHelper.deleteFilmCopy(idToDel).then(this.fetch).catch((e)=>alert(e)).finally(()=>this.setState({loading:false}))
    };


    fetch = async() => {
        return ApiHelper.getFilmCopies().then( response =>{
            console.log(response);
            this.setState({
                copies: response.data,
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
        if(this.state.copies.length ===  0)
            return <span className="noTests">No Copies</span>;
        return <BasicTable
            data={this.state.copies}
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
            <Row className="m-2"><Link to={"/film-copies/add"}><Button>New Copy</Button></Link></Row>
            {this.getBody()}
        </Container>
    }
}

export default FilmCopyList;