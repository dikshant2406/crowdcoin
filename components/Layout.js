import React from "react";
import Header from './header.js' ;
import { Container } from "semantic-ui-react";
import Head from 'next/head' ;

const layout = (props) => {
    return (
        <Container>
            <Head>
            <link
                rel="stylesheet"
                href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
            ></link>
            </Head>
            <Header />
                {props.children}
        </Container>
    ) ;
} ;

export default layout