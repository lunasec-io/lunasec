/* eslint react/prop-types: 0 */
import jsonp from 'jsonp';
import React from 'react';

export default class Mailchimp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {},
      status: null,
    };
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const { fields, action } = this.props;
    const values = fields
      .map((field) => {
        return `${field.name}=${encodeURIComponent(this.state.values[field.name])}`;
      })
      .join('&');
    const path = `${action}&${values}`;
    const url = path.replace('/post?', '/post-json?');
    const regex = /^([\w_.\-+])+@([\w-]+\.)+([\w]{2,10})+$/;
    const email = this.state.values['EMAIL'];
    !regex.test(email) ? this.setState({ status: 'empty' }) : this.sendData(url);
  }

  sendData(url) {
    this.setState({ status: 'sending' });
    jsonp(url, { param: 'c' }, (err, data) => {
      if (err) {
        this.setState({ status: 'error', msg: err });
      } else if (data.result !== 'success') {
        this.setState({ status: 'error', msg: data.msg });
      } else {
        this.setState({ status: 'success' });
      }
    });
  }

  render() {
    const { fields } = this.props;
    return (
      <form className={'contact-form'} onSubmit={this.handleSubmit.bind(this)}>
        {fields.map((f) => (
          <input
            {...f}
            key={f.name}
            onChange={(e) =>
              this.setState({
                values: {
                  ...this.state.values,
                  [f.name]: e.target.value,
                },
              })
            }
            value={this.state.values[f.name] || ''}
          />
        ))}
        <button disabled={this.state.status === 'sending' || this.state.status === 'success'} type="submit">
          Subscribe
        </button>
        {this.state.status === 'sending' ? 'Sending' : null}
        {this.state.status === 'success' ? 'Subscribed successfully!' : null}
        {this.state.status === 'error' ? (this.state.msg ? this.state.msg : 'Error') : null}
      </form>
    );
  }
}
