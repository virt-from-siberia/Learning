import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Modal } from "react-bootstrap";

export default class extends React.Component {
  static propTypes = {
    formData: PropTypes.object.isRequired,
    onSend: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
  };

  state = {
    showModal: false
  };

  showModal = () => {
    this.setState({
      showModal: true
    });
  };
  hideModal = () => {
    this.setState({
      showModal: false
    });
  };
  confirmModal = () => {
    this.hideModal();
    this.props.onSend();
  };

  render() {
    let formFilds = [];

    for (let name in this.props.formData) {
      let field = this.props.formData[name];
      formFilds.push(
        <Form.Group key={name} controlId={"order-form-" + name}>
          <Form.Label>{field.label}</Form.Label>
          <Form.Control
            type="text"
            value={field.value}
            onChange={e => this.props.onChange(name, e.target.value)}
          />
        </Form.Group>
      );
    }
    return (
      <div>
        <h2>Order</h2>
        <hr />
        {/* TODO: FORM ===================== */}
        <Form>{formFilds}</Form>
        <Button variant="warning" onClick={this.props.onBack}>
          Back to Cart
        </Button>
        &nbsp;
        <Button variant="primary" onClick={this.showModal}>
          Apply Order
        </Button>
        {/* TODO: MODAL ===================== */}
        <Modal show={this.state.showModal} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Check information</Modal.Title>
          </Modal.Header>
          <Modal.Body>content</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideModal}>
              Close
            </Button>
            <Button variant="primary" onClick={this.confirmModal}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
