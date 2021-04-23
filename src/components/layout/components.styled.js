import styled from 'styled-components';

export const StyledBody = styled.div`
    position:fixed;
    height:calc(100vh - 80px)!important;
    width:100%;
    bottom:0;
    overflow:auto;
    @media screen and (min-width:1024px){
    right:0;
    height:calc(100vh - 100px)!important;
    width:calc(100% - 350px)!important;
    }
`;