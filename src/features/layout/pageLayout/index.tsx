import { Header } from "../header";
import { Footer } from "../footer";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

export const LayoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const PageLayout = () => {
    return (
        <LayoutWrapper>
            <Header />
            <Outlet />
            <Footer />
        </LayoutWrapper>
    )
}