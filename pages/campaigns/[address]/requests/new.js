import React, { Component } from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import CampaignInstance from '../../../../ethereum/campaign';
import web3 from '../../../../ethereum/web3';
import Router from 'next/router';
import Layout from '../../../../components/Layout';
import { throttle } from 'lodash';

class RequestNew extends Component {

    state = {
        value: '',
        description: '',
        recipient: '',
        error: '',
        loading: false
    }

    static async getInitialProps({ query }) {
        const { address } = query;

        return { address: address };
    }

    validateRecipient = throttle(async (recipient) => {
        if (web3.utils.isAddress(recipient) || recipient === '') {
            this.setState({ error: '' });
        } else {
            this.setState({ error: 'Recipient is not valid. Check your address.' });
        }
    }, 400);

    handleRecipientChange = (event) => {
        const recipient = event.target.value;
        this.setState({ recipient });
        this.validateRecipient(recipient);
    }

    onSubmit = async (event) => {
        event.preventDefault();

        const campaing = CampaignInstance(this.props.address);
        const { description, value, recipient } = this.state;

        this.setState({ loading: true, error: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            await campaing.methods
                .createRequest(
                    description,
                    web3.utils.toWei(value, "ether"),
                    recipient
                ).send({ from: accounts[0] });

            Router.push(`/campaigns/${this.props.address}/requests`);
        } catch (err) {
            this.setState({ error: err.message });
        }
        this.setState({ loading: false });
    }

    render() {
        return (
            <Layout>
                <h3>Create a Request</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.error}>
                    <Form.Field>
                        <label>Description</label>
                        <Input
                            value={this.state.description}
                            onChange={event => this.setState({ description: event.target.value })}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Value in Ether</label>
                        <Input
                            value={this.state.value}
                            onChange={event => this.setState({ value: event.target.value })}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Recipient</label>
                        <Input
                            value={this.state.recipient}
                            onChange={this.handleRecipientChange}
                        />
                    </Form.Field>

                    <Message error header='Something went wrong' content={this.state.error}></Message>
                    <Button primary loading={this.state.loading}>Create!</Button>
                </Form>
            </Layout>
        );
    }
}

export default RequestNew;