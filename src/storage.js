const voteMap = new Map();
const voterMap = new Set();

class MapUtils {
    voteCount=0;
    async Set(public_key, data) {
        voteMap.set(public_key, data);
    }

     Get(public_key) {
        if (!voteMap|| voteMap.size === 0) {
            return false
        }
        return voteMap.get(public_key);
    }
    entries() {
        if (!voteMap|| voteMap.size === 0) {
            return false
        }
        return voteMap.entries();
    }
     getAll() {
        if (!voteMap || voteMap.size === 0) {
            return false
        }
        return Array.from(voteMap.values());
    }
     Has(voter_public_key) {
        return voterMap.has(voter_public_key);
    }
    async Add(voter_public_key) {
        voterMap.add(voter_public_key);
    }
    
}
const mapUtils = new MapUtils();
module.exports = mapUtils;