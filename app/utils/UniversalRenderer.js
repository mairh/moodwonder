import Iso from 'iso';
import React from 'react';
import Router from 'react-router';

const renderToMarkup = (alt, routes, state, url) => {
    let markup;

    Router.run(routes, url, (Handler) => {
        alt.bootstrap(state);
        let content = React.renderToString(React.createElement(Handler));
        markup = Iso.render(content, alt.flush());
    });
    return markup;
};

export default function UniversalRenderer(alt, routes, html) {
    let render;
    if (typeof window === 'undefined') {

        if (html) {
            render = (state, url) => {
                const markup = renderToMarkup(alt, routes, state, url);
                return html.replace('CONTENT', markup);
            };
        } else {
            render = (state, url) => {
                return renderToMarkup(alt, routes, state, url);
            };
        }
    } else {
        render = Iso.bootstrap((state, _, container) => {
            alt.bootstrap(state);
            Router.run(routes, Router.HistoryLocation, (Handler) => {
                let node = React.createElement(Handler);
                React.render(node, container);
            });
        });
    }
    return render;
}
