  // unfortunately didnt manage to get this flag working :(
exports.httpHandler = {
  endpoints: [
    {
      method: 'GET',
      path: '/test-flag',
      handle: function handle(ctx) {
        const storage = ctx.storage;
        const testFlag = storage.get('test-flag') || false;
        ctx.response.json({enabled: testFlag});
      }
    },
    {
      method: 'POST',
      path: '/test-flag',
      handle: function handle(ctx) {
        const storage = ctx.storage;
        const requestBody = ctx.request.body;
        const newState = requestBody.enabled;
        storage.set('test-flag', newState);
        ctx.response.json({enabled: newState, success: true});
      }
    }
  ]
};
