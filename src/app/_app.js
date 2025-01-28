import Head from 'next/head';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <link rel="icon" href="/favicon.ico" />
                <title>Todo Task</title>
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
