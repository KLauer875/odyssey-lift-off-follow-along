import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Layout, ModuleDetail, QueryResult } from '../components';


/** GQL query to get a specific module and it's parent by their IDs */
export const GET_MODULE_AND_PARENT_TRACK = gql`
    query GetModuleAndParentTrack($moduleId: ID!, $trackId: ID!) {
        module(id: $moduleId) {
            title
            length
            content
            videoUrl
        }
        track(id: $trackId) {
            title
            id
            modules {
                id
                title
                length
            }
        }
    }
`;

/**
 * Module Page fetches both a module and it's parent's data and
 * provides it to the module-detail component
 */
const Module = ({ moduleId, trackId }) => {
    const { loading, error, data } = useQuery(GET_MODULE_AND_PARENT_TRACK, {
        variables: { moduleId, trackId },
    });
    
    return (
        <Layout fullWidth>
            <QueryResult error={error} loading={loading} data={data}>
                <ModuleDetail track={data?.track} module={data?.module} />
            </QueryResult>
        </Layout>
    );
};

export default Module;