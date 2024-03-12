import React from 'react';
import { useRouter } from 'next/router';

const CampaignRequestsPage = () => {
    const router = useRouter();
    const { address } = router.query;

    // Use the `address` parameter to fetch and display campaign requests
    return (
        <div>
            <h1>Campaign Requests</h1>
            <p>Address: {address}</p>
            {/* Add content to display campaign requests */}
        </div>
    );
};

export default CampaignRequestsPage;