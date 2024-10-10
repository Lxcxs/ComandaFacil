import styled from "styled-components";

export const Container = styled.section`
    max-width: 800px;
    width: 100%;
    height: 100vh;
    background-color: #222;
    position: relative;
    display: flex;
    justify-content: center;
`

export const Content = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1em;
    padding: 0 10px;
    
    div.header {
        width: 100%;
        text-align: center;
        padding: 10vh 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        div {
            width: fit-content;
            span {
                color: #00ff00;
                display: flex;
                align-items: center;
                
                font-size: 12px;
                gap: 3px;
            }
        }
    }

    p {
        color: yellow;
    }
`

export const FormContent = styled.form`
    width: 100%;
    height: 70vh;
    position: absolute;
    bottom: 0;
    border-top-right-radius: 2em;
    border-top-left-radius: 2em;
    background: #333;
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 20px 10px;
    box-shadow: 0 0 10px #00000046;

    button {
        margin-top: 2em;
        align-self: flex-end;
        justify-self: flex-end;
    }
`