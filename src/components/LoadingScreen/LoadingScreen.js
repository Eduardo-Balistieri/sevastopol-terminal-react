import React, { Component } from 'react'
import './LoadingScreen.css'
import sevastolink from '../../assets/images/sevastolink.png'
import { Redirect } from 'react-router-dom'

class LoadingScreen extends Component {

    state = {
        redirect: false
    }

    redirect = () => {
        this.setState({ redirect: true })
    }

    componentDidMount = () => {
        const progressBar = document.getElementsByClassName('loadingBar')[0].getElementsByTagName('div')[0]
        progressBar.addEventListener('animationend', this.redirect)
    }

    render() {
        return this.state.redirect ?
            <Redirect to='/terminal' /> :
            <div className='loadingScreen'>

                <img src={sevastolink} alt='SEVASTOLINK' />

                <div className='loadingBar'>
                    <div />
                </div>

                <div className='bottomText'>
                    <p>(C) LM-LINK DATA SYSTEMS</p>
                </div>
            </div>
    }
}

export default LoadingScreen
