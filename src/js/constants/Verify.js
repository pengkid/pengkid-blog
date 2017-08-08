// libs
import { hashHistory } from 'react-router';
import { CONFIG } from '../constants/Config.js';

export const Verify = () => {
    if(!sessionStorage.getItem('__token__')) {
        hashHistory.push('/login')
    }
    
    const url = `${CONFIG.server}/api/valid`
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token : sessionStorage.getItem('__token__') || ''
        }),
        mode: 'cors'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.status === 0) {
                hashHistory.push('/login')
            }
        })
}
