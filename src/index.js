// XXX even though ethers is not used in the code below, it's very likely
// it will be used by any DApp, so we are already including it here
const { ethers } = require("ethers");
const rollup = require('./rollupStateHandler.js');
const { hexToString, getAddress } = require('viem');
const dotenv = require('dotenv')
dotenv.config();
const { controller } = require("./arrayController.js")
const rollup_server = process.env.ROLLUP_HTTP_SERVER_URL;
async function handle_advance({ metadata, payload }) {
  console.log('input:', metadata, payload)
  const sender = getAddress(metadata.msg_sender)
  const jsonPayload = JSON.parse(hexToString(payload))
  const public_key = jsonPayload.public_key
  try {
    if (jsonPayload.method === 'createCandidate') {
      data = {
        public_key: public_key,
        name: jsonPayload.name
      }
      await controller.createCandidate(public_key, data)
    } else if (jsonPayload.method === 'castVote') {
      return await controller.castAVote(sender, public_key)
    } else {
      return await rollup.handleReport({
        error: `you are not allowed to call this method`
      });
    }
  } catch (e) {
    return await rollup.handleReport({
      error: e
    });
  }
}
async function handle_inspect(data) {
  const urlParams = hexToString(data.payload);
  const urlParamsSplited = urlParams.split('/');
  const requestedAction = urlParamsSplited[0];
  let action;
  if (requestedAction === "getAllCandidate") {
    action = await controller.getAllCandidate();
  } else if (requestedAction === "getSingleCandidate") {
    action = await controller.getSingleCandidate(urlParamsSplited[1]);
  } else if (requestedAction === "getWinner") {
    action = controller.winner();
  }
  else {
    return await rollup.handleReport({
      error: `url path {{${requestedAction}}} does not exist.`
    });
  }
  return action
}


var handlers = {
  advance_state: handle_advance,
  inspect_state: handle_inspect,
};

var finish = { status: "accept" };

(async () => {
  while (true) {
    const finish_req = await fetch(rollup_server + "/finish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "accept" }),
    });

    console.log("Received finish status " + finish_req.status);

    if (finish_req.status == 202) {
      console.log("No pending rollup request, trying again");
    } else {
      const rollup_req = await finish_req.json();
      var handler = handlers[rollup_req["request_type"]];
      finish["status"] = await handler(rollup_req["data"]);
    }
  }
})();
