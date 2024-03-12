import React from 'react';
import { Menu } from 'semantic-ui-react';
import Router from 'next/router';

const Header = () => {

    const onRouteToMain = () => {
        Router.push('/');
    };

    return (
        <Menu style={{ marginTop: '10px' }}>
            <Menu.Item onClick={onRouteToMain}>CrowdCoin</Menu.Item>
            <Menu.Menu position='right'>
                <Menu.Item>
                    Campaign
                </Menu.Item>

                <Menu.Item icon="plus">

                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
};

export default Header;