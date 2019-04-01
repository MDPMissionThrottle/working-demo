import React, {Component} from 'react';

class SmsHandler extends Component {
    constructor(props) {
        super(props);
        this.state = {
          message: {
            phone: '',
            survey_id: ''
          },
          submitting: false,
          error: false
        };
        this.onHandleChange = this.onHandleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }

    onHandleChange(event) {
        const name = event.target.getAttribute('name');
        this.setState({
            message: { ...this.state.message, [name]: event.target.value }
        });
    }

    onSubmit(event) {
        event.preventDefault();
        this.setState({ submitting: true });
        fetch('/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state.message)
        })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              this.setState({
                error: false,
                submitting: false,
                message: {
                  phone: '',
                  survey_id: ''
                }
              });
            } else {
              this.setState({
                error: true,
                submitting: false
              });
            }
          });
      }

    render() {
        return (
            <form
            onSubmit={this.onSubmit}
            className={this.state.error ? 'error sms-form' : 'sms-form'}
          >
            <div>
              <label htmlFor="phone">Phone number:</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={this.state.message.phone}
                onChange={this.onHandleChange}
              />
            </div>
            <div>
              <label htmlFor="body">Survey ID:</label>
              <textarea
                name="survey_id"
                id="survey_id"
                value={this.state.message.body}
                onChange={this.onHandleChange}
              />
            </div>
            <button type="submit" disabled={this.state.submitting}>Send message</button>
          </form>
        );
      }


}
export default SmsHandler;


