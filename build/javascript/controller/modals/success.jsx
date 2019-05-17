import React from "react";

class SuccessModal extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="modal" id="successModal" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="c-modal-header c-success">
                            <h6 className="modal-title">{this.props.title}</h6>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>{this.props.success}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-primary" data-dismiss="modal">Закрыть</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export {SuccessModal};