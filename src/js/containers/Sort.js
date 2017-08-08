// libs
import React from 'react';
import { connect } from 'react-redux';

// components
import { getArticlesBySort } from '../actions/index.js';

class Sort extends React.Component {
    constructor() {
        super()
        this.classes = [
            { fName: '首页', name:'index', selected: true },
            { fName: '学无止境', name:'study', selected: false },
            { fName: '杂七杂八', name:'something', selected: false },
            { fName: '资源分享', name:'resource', selected: false },
            { fName: '标签云', name:'tabs', selected: false },
            { fName: '关于', name:'about', selected: false } 
        ]
    }
    
    componentDidMount() {
        const { sort } = this.props;
        this.handleOnclick(sort || 'all')
    }
    
    handleOnclick(name) {
        const { dispatch } = this.props
        this.classes.forEach(o => {
            if(o.name === name) {
                o.selected = true
            }
            else {
                o.selected = false
            }
        })
        dispatch(getArticlesBySort(name))
    }
    
    render() {
        return(
            <div className="class">
                {this.classes.map((o, i) => 
                    <span 
                        key={i} 
                        className={o.selected ? 'selected': ''}
                        onClick={() => this.handleOnclick(o.name)}
                    >
                        {o.fName}
                    </span>
                )}
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { articles } = state || { articles: [] }
    return { articles }
}

export default connect(mapStateToProps)(Sort)