import React, { Component } from 'react'
import './SignIn.css'
import { Redirect } from 'react-router-dom'

class SignIn extends Component {

    state = {
        redirect: false
    }

    redirect = () => {
        this.setState({ redirect: true })
    }

    componentDidMount() {
        document.addEventListener('keyup', (event) => {
            if (event.code === 'Space')
                this.redirect()
        })
    }

    render() {
        return this.state.redirect ? <Redirect to='/loading-screen' /> :
            <div className='signIn' onClick={this.redirect}>
                <div>
                    <span>sign in</span>
                </div>
            </div>
    }
}

export default SignIn