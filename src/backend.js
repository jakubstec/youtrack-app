/*
Description:
  HTTP endpoints:
    GET to retrieve the current state of the flag
    POST to update the flag's state
  Uses YouTrack's global storage to persist the flag value
  flag is accessed via extensionProperties.globalTestFlag which is defined in entity-extensions.json
*/

exports.httpHandler = {
  endpoints: [
    {
      method: 'GET',
      path: '/test-flag',
      handle: function handle(ctx) {
        const flag = ctx.globalStorage.extensionProperties.globalTestFlag || false;
        ctx.response.json({value: flag});
      }
    },
    {
      method: 'POST',
      path: '/test-flag',
      handle: function handle(ctx) {
        const requestBody = ctx.request.json();
        const newStateValue = requestBody.value;
        ctx.globalStorage.extensionProperties.globalTestFlag = newStateValue;
        ctx.response.json({value: newStateValue, success: true});
      }
    }
  ]
};
