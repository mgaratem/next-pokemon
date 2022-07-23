import Head from 'next/head';
import { PropsWithChildren } from 'react';
import { Container } from "@nextui-org/react";


interface Props {
    children: React.ReactNode;
}

export const Layout: React.FC<PropsWithChildren<Props>> = ({ children }) => {
    return (
        <>
            <Head>
                <title>Pokédex</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
                <meta name="author" content="Macarena Garate" />
                <meta name="description" content="Replica of the Oficial Pokédex Site" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Container responsive>
                        { children }
                </Container>
            </main>
            
        </>
    )
};