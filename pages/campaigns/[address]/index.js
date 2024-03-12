import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import CampaignInstance from '../../../ethereum/campaign';
import { Card, Grid, Button } from 'semantic-ui-react';
import web3 from '../../../ethereum/web3';
import ContributeForm from '../../../components/ContributeForm';
import Router from 'next/router';

class CampaignDetails extends Component {

    static async getInitialProps({ query }) {
        const address = query.address;
        const campaign = CampaignInstance(address);
        const summary = await campaign.methods.getSummary().call();

        return {
            address: address,
            minimumContribution: summary[0].toString(),
            balance: summary[1].toString(),
            requestCount: summary[2].toString(),
            approversCount: summary[3].toString(),
            manager: summary[4]
        };
    }

    handleContributionSuccess = () => {
        Router.replace(`/campaigns/${this.props.address}`);
    }

    navigateToRequests = () => {
        Router.push(`/campaigns/${this.props.address}/requests`);
    }

    renderCards() {
        const {
            balance,
            manager,
            minimumContribution,
            requestCount,
            approversCount
        } = this.props;

        const items = [
            {
                header: manager,
                meta: 'Address of manager',
                description: 'The manager created this campaign and can create requests to withdraw money',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'You must contribute at least this much wei to become an approver'
            }, {
                header: requestCount,
                meta: 'Number of Requests',
                description: 'A request tries to withdraw money from the contract. Request must be approved by the approvers'
            },
            {
                header: approversCount,
                meta: 'Number of Approvers',
                description: 'Number of people who have already donated to this campaign'
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaigh Balance (ether)',
                description: 'The balance is how much money campaign has left to spend.'
            }
        ];

        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
                <div>
                    <h3>Campaign Details</h3>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={10}>
                                {this.renderCards()}

                            </Grid.Column>

                            <Grid.Column width={6}>
                                <ContributeForm address={this.props.address} onContributeSuccess={this.handleContributionSuccess} />
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column>
                                <Button primary onClick={this.navigateToRequests}>View Requests</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                </div>
            </Layout>
        );
    }
}

export default CampaignDetails;