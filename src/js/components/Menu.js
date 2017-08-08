// libs
import React from 'react';
import { Link } from 'react-router';

// stylesheet
import  '../../css/menu.scss';

export default class Menu extends React.Component {
    constructor() {
        super()
    }

    render() {
        const { articles, delArticleById } = this.props;

        return (
        
        <div className="blog__posts mdl-grid">
        {
            sessionStorage.getItem('__token__') && (sessionStorage.getItem('__username__') === 'pengkid') &&
            <Link to="/write/new" className="blue-font">写文章</Link>
        }
        {
            articles.map((o, i) =>
                <section key={i} className="mdl-card mdl-shadow--4dp mdl-cell mdl-cell--12-col">
                    <div className="mdl-card__media mdl-color-text--grey-50">
                        <h3><Link to={`/article/${o._id}`}>{`${o.title}`}</Link></h3>
                        <div className="tags">
                            <i className="material-icons" style={{marginRight:'10px'}}>local_offer</i>
                            {
                                o.tags.map((o, i) => 
                                    <a key={i} href="" className="tag">{o}</a>
                                )
                            } 
                        </div>
                    </div>
                    <div className="mdl-card__supporting-text mdl-color-text--grey-600">
                        {o.infos}
                    </div>
                    <div className="mdl-card__supporting-text meta mdl-color-text--grey-600">
                        <div className="minilogo"></div>
                        <div>
                            <time>{o.create_time}</time>
                            <strong>PengKid</strong>
                        </div>
                        <div className="section-spacer"></div>
                        <Link to={`/${o.sort}`} className="label mdl-color--teal">{o.sort}</Link>
                    </div>
                    {   
                        sessionStorage.getItem('__token__') && (sessionStorage.getItem('__username__') === 'pengkid') &&
                        <div>
                            <Link to={`/write/${o._id}`} className="update-btn">改</Link>
                            <a onClick={() => delArticleById(o._id)} className="update-btn">删</a>
                        </div>
                    }
                </section>
            )
        }
        </div>
        )
    }
        
}