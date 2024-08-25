
const map = require("./storage.js");
const rollup = require('./rollupStateHandler.js');

class VotingSystem {
    async addCandidate(public_key, data) {
        const candidateData = {
            ...data,
            voteCount: 0
        };
        await map.Set(public_key, candidateData);
        return rollup.handleNotice("Candidate added successfully");
    }
    async getCandidates() {
        const getAll =  map.getAll();
        if (!getAll) {
            return rollup.handleReport({
                error: "No candidates has been registered"
            }, 'reject');
        }
        return await rollup.handleReport(getAll, 'accept');
    }
    async getACandidate(public_key) {
        console.log("This is the Candidate",public_key)
        const candidate = map.Get(public_key);
        if (!candidate) {
            return await rollup.handleReport({
                error: "Invalid public_key. Kindly check and try again!"
            },'reject');
        }
        return await rollup.handleReport({ candidate }, "accept");
    }
    static async hasVoted(voter_public_key) {
        return  map.Has(voter_public_key);
    }
    
    static async closeVote() {
        const entries = map.entries()
        console.log("entries",entries)
        let winningCandidate = null;
        let maxVotes = 0;

        if (!entries) {
            return rollup.handleReport({
                error: "No votes have been registered"
            });
        }
        for (const [public_key, candidate] of  entries) {
            if (candidate.voteCount > maxVotes) {
                winningCandidate = candidate;
                maxVotes = candidate.voteCount;

            }
        }

        if (winningCandidate) {
            const winnerDetails = await VotingSystem.getSingleCandidate(winningCandidate.public_key);
            return rollup.handleReport({
                winner: "WINNER:", winnerDetails,
            });
        } else {
            return rollup.handleReport({
                error: "No valid candidate found"
            });
        }
    }

    static async getSingleCandidate(public_key) {
        const candidate =  map.Get(public_key);
        if (candidate) {
            return {
                public_key: public_key,
                name: candidate.name,
                voteCount: candidate.voteCount
            };
        } else {
            return null;
        }
    }
    async castVote(voter_public_key, public_key) {
        try{
            const check =await VotingSystem.hasVoted(voter_public_key)
            if ( check ) {
                return await rollup.handleReport({
                    error: "VotingSystem user has already voted"
                });
            }
            const candidate = map.Get(public_key);
            console.log("This is the castVote",public_key)
            if (!candidate) {
                return await rollup.handleReport({
                    error: "Candidate does not exist"
                });
            }
            candidate.voteCount = (candidate.voteCount || 0) + 1;
            await map.Set(public_key, candidate);
            await map.Add(voter_public_key);
            map.voteCount=map.voteCount + 1;
            if (map.voteCount >= 5) {
                await VotingSystem.closeVote();
            }
            return  rollup.handleNotice("Vote cast successfully");
        }
        catch(e){
            console.log('false',e)
        }
  
    }
   

}

module.exports = { VotingSystem };
