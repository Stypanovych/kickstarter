import React, { Component } from 'react';
import Router, { useRouter } from 'next/router';
import Layout from '../../../../components/Layout';
import { Button, Table } from 'semantic-ui-react';
import Campaign from '../../../../ethereum/campaign';
import RequestRow from '../../../../components/RequestRow';

class RequestIndex extends Component {

    static async getInitialProps({ query }) {
        const { address } = query;
        const campaign = Campaign(address);

        const requests = await campaign.methods.getRequests().call();
        const convertedRequests = requests.map(request => ({
            ...request,
            value: String(request.value),
            approvalCount: String(request.approvalCount)
        }));
        const approversCount = String(await campaign.methods.approversCount().call());

        console.log("convertedRequests", convertedRequests);
        // console.log("approversCount", approversCount);

        return { address, approversCount, requests: convertedRequests };
    }

    navigateToNewRequest = () => {
        Router.push(`/campaigns/${this.props.address}/requests/new`);
    }

    renderRows() {
        return this.props.requests.map((request, index) => {
            return <RequestRow
                request={request}
                id={index}
                key={index}
                address={this.props.address}
                approversCount={String(this.props.approversCount)}
            />;
        });
    }

    render() {
        const { Header, Row, Body, HeaderCell } = Table;
        return (
            <Layout>
                <h3>Requests</h3>
                <Button primary floated="right" style={{ marginBottom: 10 }} onClick={this.navigateToNewRequest}>Add Request</Button>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRows()}
                    </Body>
                </Table>
                <div>Found {this.props.requests.length}</div>
            </Layout>
        )
    }
}

export default RequestIndex;