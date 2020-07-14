import React, { Component } from 'react'
import './Terminal.css'
import Header from '../../components/UI/Header/Header'
import FolderBlock from '../../components/FolderBlock/FolderBlock'
import MessageInformations from '../../components/MessageInformations/MessageInformations'

class Terminal extends Component {

    constructor() {

        super()
        let messages = []

        messages.push({
            id: 0,
            category: 'personal',
            primaryTitle: 'error',
            secundaryTitle: 'error',
            primaryMessage: 'BAD PATH',
            secundaryMessage: ''
        })
        messages.push({
            id: 1,
            category: 'shared',
            primaryTitle: 'sit tight',
            secundaryTitle: 'gemini shutdown',
            primaryMessage: `S - We're going to have to find a new way to get the goods into Sevastopol. Waits has commercial cargo under scrutiny at the moment and he's checking the ambulance shuttles. Tell your man outside to sit tight for now, I know a guy called Sinclair who could help us.\n
            I remember when the marshals actually had to deal with real crime rather than harassing businessmen and screwing with their deals. - T`,
            secundaryMessage: `Ladies and Gentlemen, I appreciate many of you are upset with the current situation and the imminent total shutdown of Gemini. I have been asked by Seegston to assure you that the future of Sevastopol itself is 100% secure. Early negotiations with interested corporate buyers have begun in earnest.\n
            In the mean-time, before you leave, please deposit all Seegson- owned equipment in the Security Locker. The code is 2743.\n
            We have made a full inventory, and the Marshals will be informed if anything goes missing.`
        })
        messages.push({
            id: 2,
            category: 'audio',
            primaryTitle: 'error',
            secundaryTitle: '',
            primaryMessage: 'ERROR: ILLEGAL SEEK',
            secundaryMessage: ''
        })
        messages.push({
            id: 3,
            category: 'utility',
            primaryTitle: 'error',
            secundaryTitle: '',
            primaryMessage: '',
            secundaryMessage: ''
        })

        this.state = {
            messages: messages,
            selectedMessage: 0,
            isTitleSelected: true
        }
    }

    selectMessageHandler = (id) => {
        if (id === this.state.selectedMessage)
            return
        this.setState({
            isTitleSelected: true,
            selectedMessage: id
        })
    }

    selectBlockHandler = (isTitleSelected) => {
        if (isTitleSelected === this.state.isTitleSelected)
            return
        this.setState({ isTitleSelected })
    }

    offset = (el) => {
        let rect = el.getBoundingClientRect()
        let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop

        return {
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft
        }
    }

    draw = () => {

        const canvasElement = document.getElementsByClassName('canvas')[0]
        const display = getComputedStyle(canvasElement).getPropertyValue('display')

        if (display === 'none')
            return

        const canvasElementWidth = parseInt(getComputedStyle(canvasElement).getPropertyValue('width'), 10)

        const leftElement = document.getElementById('left' + this.state.selectedMessage)
        const leftElementOffset = this.offset(leftElement)
        const leftElementHeight = parseInt(getComputedStyle(leftElement).getPropertyValue('height'), 10)

        const rightElementActive = document.getElementById(`right${this.state.selectedMessage}Active`)
        const rightElementActiveOffset = this.offset(rightElementActive)
        const rightElementActiveHeight = parseInt(getComputedStyle(rightElementActive).getPropertyValue('height'), 10)

        const rightElementDesactive = document.getElementById(`right${this.state.selectedMessage}Desactive`)
        const rightElementDesactiveOffset = this.offset(rightElementDesactive)
        const rightElementDesactiveHeight = parseInt(getComputedStyle(rightElementDesactive).getPropertyValue('height'), 10)

        const canvas = document.getElementById('canvasLine')
        const context = canvas.getContext('2d')

        const bigger = rightElementActiveHeight > rightElementDesactiveHeight ?
            (rightElementActiveOffset.top - rightElementActiveHeight) :
            (rightElementDesactiveOffset.top - rightElementDesactiveHeight)

        context.strokeStyle = 'white'
        context.lineWidth = 2

        context.clearRect(0, 0, canvas.width, canvas.height)

        context.beginPath()
        context.setLineDash([]);
        context.moveTo(0, (leftElementOffset.top - leftElementHeight / 9))
        context.lineTo(canvasElementWidth / 2, (leftElementOffset.top - leftElementHeight / 9))
        context.lineTo(canvasElementWidth / 2, bigger)
        context.lineTo(canvasElementWidth / 2, (rightElementActiveOffset.top - rightElementActiveHeight))

        context.shadowColor = 'white'
        context.shadowBlur = 1.5

        context.lineTo(canvasElementWidth, (rightElementActiveOffset.top - rightElementActiveHeight))
        context.stroke()

        context.strokeStyle = '#3eac66'

        context.beginPath()
        context.setLineDash([3, 4]);
        context.moveTo(canvasElementWidth / 2, (rightElementDesactiveOffset.top - rightElementDesactiveHeight))
        context.lineTo(canvasElementWidth, (rightElementDesactiveOffset.top - rightElementDesactiveHeight))
        context.stroke()

    }

    componentDidUpdate = () => {
        this.draw()
    }

    componentDidMount = () => {

        window.addEventListener('resize', this.draw)

        const canvasElement = document.getElementsByClassName('canvas')[0]

        const width = parseInt(getComputedStyle(canvasElement).getPropertyValue('width'), 10) // largura
        const height = parseInt(getComputedStyle(canvasElement).getPropertyValue('height'), 10)
        const canvas = document.getElementById('canvasLine')

        canvas.width = width
        canvas.height = height

        this.draw()
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.draw)
    }

    render() {

        const folderBlocks = this.state.messages.length > 0 ? (
            <React.Fragment>
                {this.state.messages.map(element => (
                    <FolderBlock
                        key={element.id}
                        id={element.id}
                        title={element.category}
                        selected={() => this.selectMessageHandler(element.id)}
                        isMessageSelected={element.id === this.state.selectedMessage}
                    />
                ))}
            </React.Fragment>
        ) : null

        const currentMessage = { ...this.state.messages[this.state.selectedMessage] }

        return (
            <React.Fragment>

                <Header title='personal terminal' />

                <main className='gridStructure'>

                    <section className='folders'>

                        <div className='sectionTitle'>
                            <span>FOLDERS</span>
                        </div>

                        {folderBlocks}

                    </section>

                    <section className='canvas'>
                        <canvas id='canvasLine' />
                    </section>

                    <section className='info'>

                        <MessageInformations
                            selectBlock={(isTitleSelected) => this.selectBlockHandler(isTitleSelected)}
                            message={currentMessage}
                            isTitleSelected={this.state.isTitleSelected}
                            selectedMessage={this.state.selectedMessage}
                        />
                    </section>

                </main>
            </React.Fragment>
        )
    }

}

export default Terminal