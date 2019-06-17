const AWS = require('aws-sdk');
const http = requre('http');

exports.handler = (event,  context, callback) => {
    const debugging = {
        'event': event,
        'context': context,
        'callback': callback
    };
    console.log('fetchSubscriptions.js - debugging:', debugging);
    /**
     * @name getSubscriptions
     * @description - 
     */
    function getSubscriptions() {
        // this could probably be abstracted to some type of environment variable/config
        const options = {
            hostname: 'wakemygameup.com',
            port: 80,
            path: '/feeds/subscriptions.json',
        };
        let subscriptions;
        // get the published list of subscriptions
        http.get(options, function(response) {
            if (response) {
                try {
                    // this may be unnecessary, but it might be  worth adding validation of the response around here
                    const subscriptionInformation = JSON.parse(response.body);
                    subscriptionInformation.subscriptions.map(subscription => subscriptions.push(subscription));
                    

                } catch (error) {
                    // now what?
                }
            }
        });
        return subscriptions;
    }
    /**
     * @name convertXmlToDom
     * @param {String} xml - the xml 
     * @description - A way of hiding potential error handling 
     */
    function convertXmlToDom(xml) {
        const objectParser = new DOMParser();
        const objectDom = objectParser.parseFromString(xml, "application/xml");
        return objectDom;
    }
    /**
     * @name fetchSubscriptionContent
     * @param {Object} subscription 
     *  - name {String}
     *  - type {String}
     *  - path {String}
     * @description - 
     */
    function fetchSubscriptionContent(subscription) {
        // pick off the path information from the subscription
        const subscriptionSource = new URL(subscription.url);
        const { path, name, type } = subscription;
        const options = {
            hostname: subscriptionSource.hostname,
            path: subscriptionSource.pathname
        };
        http.get(options, function(response) {
            // domain logic starts kicking in around here
            if (response.status === 200) {
                
            }
        });
        return subscriptionContent;
    }

    if (event) {
        const subscriptions = getSubscriptions();
        // implicit dependence on subscriptions being iterable having a .length property
        if (subscriptions.length) {
            const subscriptionsContent = subscriptions.map(subscription => fetchSubscriptionContent(subscription));
            console.log('subscriptionsContent', subscriptionsContent);
        }
    }

}