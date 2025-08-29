const { WechatWorkNode } = require('./dist/nodes/WechatWorkNode/WechatWorkNode.node.js');
const { WechatWorkCredentialsApi } = require('./dist/credentials/WechatWorkCredentialsApi.credentials.js');

module.exports = {
	nodes: [WechatWorkNode],
	credentials: [WechatWorkCredentialsApi],
};
