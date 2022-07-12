import React from 'react'

export const FileMessage = ({messages}) => {
    var messageArray = messages.split('-')
    return (
        messageArray.map((message, index) => (<img key={index} alt="name" src={message} width="100" height="100" />))
    )
}
