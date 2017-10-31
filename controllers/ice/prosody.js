'use strict';

const Joi = require('joi');

const FetchICE = require('../../lib/fetch_ice');
const UserInfo = require('../../lib/user_info');
const Schema = require('../../lib/schema');


module.exports = {
  description: 'Provide ICE servers and credentials to Prosody',
  tags: ['api', 'ice'],
  handler: function (request, reply) {

    const user = UserInfo(request.payload.user_id, request.payload.session_id);
    return reply(FetchICE(user.orgId, user.id));
  },
  validate: {
    payload: {
      user_id: Joi.string().required(),
      session_id: Joi.string().required()
    }
  },
  response: {
    status: {
      200: Schema.iceServers
    }
  },
  auth: 'internal-api'
};

