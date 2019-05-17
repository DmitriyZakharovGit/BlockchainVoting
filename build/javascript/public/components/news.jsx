import React from "react";
import DocumentTitle from 'react-document-title';

class NewsComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <DocumentTitle title="Новости | Expit.Online">
                <div className="container-fluid">
                </div>
            </DocumentTitle>
        )
    }
}

export {NewsComponent};