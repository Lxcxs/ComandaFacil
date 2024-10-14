import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: auto;
    padding-left: 80px;
    display: flex;

    div.content {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding-top: 10vh;
    }
    @media (max-width: 760px)  {
        padding-left: 0;

        padding-bottom:4em;
        align-items: center;
        justify-content: center;
    }
`