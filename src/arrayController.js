const { VotingSystem } = require('./voteController.js');

const voteController = new VotingSystem();
const controller = {
  createCandidate: voteController.addCandidate,
  getAllCandidate: voteController.getCandidates,
  getSingleCandidate: voteController.getACandidate,
  castAVote: voteController.castVote,
  winner:VotingSystem.closeVote
};
module.exports ={controller}
