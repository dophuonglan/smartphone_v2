import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
        }
    }
    onChange = (event) => {
        this.props.onFetchProduct();
        var { target } = event;
        var { name, value } = target;
        this.props.onFilter(name === 'search' ? value : this.state.search)
        this.setState({
            [name]: value
        });
    }
    showFilterProduct = (productFilter) => {
        
        return productFilter && productFilter.map((prd, key) => {
            let image = prd&& prd.Image.slice(15);
                const newImage = require('./../../../../../BACKEND/newapp/public/uploads/' + image).default;
            var detail = `/product/${prd.IDProduct}`
            return <li key={key} className="mt-1 ml-1 mr-1">
                <Link to={detail} onClick ={()=>this.setState({search :''})}>
                    <div className='row'>
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 mt-1 ml-3">
                            <img src={image && newImage} alt="product-view" width="40" height="41"/>
                        </div>
                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                            <p>{prd.Name}</p>
                            <p>{prd.Price}</p>
                        </div>
                    </div>
                </Link>
            </li>
        })
    }
    onSubmit =(e)=>{
        e.preventDefault();
    }
    onSearch =()=>{
        var {productFilter} =this.props;
        if(productFilter){
            this.props.onFetchProductFilter(productFilter)
        }
    }
    handleKeyDown=(e)=>{
        var {productFilter} =this.props;
        if (e.key === 'Enter' && productFilter) {
            this.props.onFetchProductFilter(productFilter)
        }
    }
    render() {
        var { search } = this.state;
        var { productFilter } = this.props;
        return (
            <div className="col-md-6  order-3 order-md-2">
                <div className=" categorie-search-box">
                    <form action="#" onSubmit={this.onSubmit}>
                        <input
                            type="text"
                            name="search"
                            placeholder="Tìm kiếm"
                            autoComplete="off"
                            value={search}
                            onChange={(e) => this.onChange(e)}
                            onKeyDown={this.handleKeyDown}
                        />
                        <button>
                            <span className="ti-search" onClick={this.onSearch} />
                        </button>
                        <div className='fs-sresult'>
                            <div className='fs-sremain'>
                                <ul>
                                    {search ? this.showFilterProduct(productFilter) :''}
                                </ul>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Search;