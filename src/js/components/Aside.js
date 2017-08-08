// libs
import React from 'react';
import { Link } from 'react-router';

// images
import pengkid from '../../images/pengkid.jpeg'

export default class Aside extends React.Component {
    constructor(props) {
        super(props)
        this.navs = [
            { fName: '首页', name:'home', selected: true },
            { fName: '学无止境', name:'edit', selected: false },
            { fName: '杂七乱八', name:'view_quilt', selected: false },
            { fName: '资源分享', name:'card_giftcard', selected: false },
            { fName: '标签云', name:'loyalty', selected: false },
            { fName: '关于', name:'info', selected: false } 
        ]
    }

    componentDidMount() {
        this.handleOnclick('home');
    }

    handleOnclick(name) {
        this.navs.forEach(o => {
            if(o.name === name) o.selected = true;
            else o.selected = false;
        })
    }

    render() {
        return (
            <aside className="mdl-layout__drawer">
                <div className="mdl-layout-title">
                    <button className="mdl-button mdl-js-button mdl-button--icon" id="close-drawer">
                        <i className="material-icons">arrow_back</i>
                    </button>
                    <div className="logo">
                        <img src={pengkid} style = {{width:'100%', borderRadius:'100%'}}/>
                    </div>
                    <div>
                        pengkid
                    </div>
                </div>
                <div className="links">
                    <div className="link-icon">
                        <a id="GitHub-social-icon" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon social-btn mdl-color-text--black" href="https://github.com/pengkid" target="_blank" rel="me">
                            <i className='iconfont icon-github'></i>
                        </a>
                    </div>
                    <div className="mdl-tooltip mdl-tooltip--top" htmlFor="GitHub-social-icon">GitHub</div>
                
                    <div className="link-icon">
                        <a id="CodePen-social-icon" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon social-btn mdl-color-text--black" href="https://www.nowcoder.com/profile/7411361" target="_blank" rel="me">
                            <i className='iconfont icon-codepen'></i>
                        </a>
                    </div>
                    <div className="mdl-tooltip mdl-tooltip--top" htmlFor="CodePen-social-icon">Nowcoder</div>
                
                    <div className="link-icon">
                        <a id="Google&#43;-social-icon" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon social-btn mdl-color-text--red" href="https://plus.google.com/u/0/" target="_blank" rel="me">
                            <i className='iconfont icon-googleplus'></i>
                        </a>
                    </div>
                    <div className="mdl-tooltip mdl-tooltip--top" htmlFor="Google&#43;-social-icon">Google&#43;</div>
    
                    <div className="link-icon">
                        <a id="知乎-social-icon" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon social-btn mdl-color-text--blue" href="https://www.zhihu.com/people/huang-jin-peng-25/answers" target="_blank" rel="me">
                            <i className='iconfont icon-zhihu'></i>
                        </a>
                    </div>
                    <div className="mdl-tooltip mdl-tooltip--top" htmlFor="知乎-social-icon">知乎</div>
                </div>
                <nav className="mdl-navigation">
                    {
                        this.navs.map((o, i) => 
                            (<Link 
                                key={i}
                                to={`/${o.fName}`}
                                className={o.selected ? 'active mdl-navigation__link': 'mdl-navigation__link'}
                                onClick={() => this.handleOnclick(o.name)}
                            >
                            {o.fName}
                            <i className="material-icons">{o.name}</i>
                            </Link>)
                        )
                    }
                </nav>
            </aside>
        )
    }
};

