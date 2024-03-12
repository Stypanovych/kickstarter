import React, { Component } from 'react';
import factory from '../ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import Router from 'next/router';

class CampaignIndex extends Component {
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        console.log(campaigns);

        return { campaigns: campaigns };
    }

    navigateToCampaign = () => {
        Router.push('/campaigns/new');
    };
    
    navigateToDetails = (address) => {
        Router.push(`campaigns/${address}`);
    }

    renderCampaigns() {
        if (!this.props.campaigns) {
            return <div>Loading...</div>
        }
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: <a onClick={() => this.navigateToDetails(address)}>View Campaign</a>,
                fluid: true
            }
        });

        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
                <div>
                    <h3>Open Campaigns</h3>
                    <Button
                        floated='right'
                        content="Create Campaign"
                        icon="add circle"
                        primary={true}
                        onClick={this.navigateToCampaign}
                    ></Button>
                    {this.renderCampaigns()}
                </div>
            </Layout>
        );
    }
}
export default CampaignIndex;
