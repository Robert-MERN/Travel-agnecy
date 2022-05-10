import React from 'react'
import styled from 'styled-components'

function Loading() {
    return (
        <Loader>
            <div></div>
        </Loader>
    )
}

const Loader = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgba(212, 210, 210, 0.6);
    display: grid;
    place-items: center;
    max-width: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 1000;
    div{
        width: 10vmax;
        height: 10vmax;
        border-bottom: 5px solid #00A99D;
        border-radius: 50%;
        animation: loadingRotate 800ms linear infinite;
    }
    img{
        width: 7%;
        height: 7%;
        object-fit: cover;
        position: absolute;
    }
    @keyframes loadingRotate {
        to {
            transform: rotateZ(-360deg);
        }
    }

`

export default Loading