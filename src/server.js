import App from './App';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const handleSSR = {
    name: 'yuntun-plugin-seed',
    version: '1.0.0',
    register: async function (server, options) {
        server.route([
            {
                method: 'GET',
                path: "/{param*}",
                config: {
                    handler: async function(request, h) {
                        const context = {};
                        const markup = renderToString(
                            <StaticRouter context={context} location={request.url}>
                            <App />
                            </StaticRouter>
                        );

                        if (context.url) {
                            return h.redirect(context.url);
                        } else {
                            return h.response(
                            `<!doctype html>
                            <html lang="">
                            <head>
                                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                                <meta charset="utf-8" />
                                <title>Welcome to Razzle</title>
                                <meta name="viewport" content="width=device-width, initial-scale=1">
                                ${
                                assets.client.css
                                    ? `<link rel="stylesheet" href="${assets.client.css}">`
                                    : ''
                                }
                                ${
                                process.env.NODE_ENV === 'production'
                                    ? `<script src="${assets.client.js}" defer></script>`
                                    : `<script src="${assets.client.js}" defer crossorigin></script>`
                                }
                            </head>
                            <body>
                                <div id="root">${markup}</div>
                            </body>
                        </html>`)
                        }
                    },
                }
            }
        ])
    }
};

export default handleSSR