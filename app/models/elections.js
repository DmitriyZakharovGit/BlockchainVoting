const Datastore = require('nedb');
const {sendMessage} = require('../controllers/mail/app');
const uuidGenerator = require('uuid/v4');
const {create} = require('./../controllers/multichain');

let db = new Datastore({
    filename: 'db/elections',
    autoload: true
});

async function add(query) {
    let request = query;
    let voters = query.voters.map((voter) => {
        return {email: voter, uuid: uuidGenerator()}
    });
    let candidates = query.candidates.map((candidate) => {
        return {candidate: candidate, uuid: uuidGenerator()}
    });

    db.insert({
        organizer: query.organizer,
        title: query.title,
        info: query.info,
        voters: voters,
        candidates: candidates,
        dtStart: query.dtStart,
        dtEnd: query.dtEnd
    });

    let election = await getElectionByVoterUuid(voters[0].uuid);

    request.token = election[0]._id;
    request.votersUuids = getUuidArray(voters);
    request.candidatesUuids = getUuidArray(candidates);

    let creationInfo = await create(request);

    voters = mergeArray(creationInfo.addressVoters, voters);
    candidates = mergeArray(creationInfo.addressCandidates, candidates);

    await updateVoters(request.token, voters);
    await updateCandidates(request.token, candidates);
    sendMessage(voters, query);
}

let getUuidArray = (array) => {
    return array.map((element) => {
        return element.uuid;
    });
};

let mergeArray = (addresses, arrayObjects) => {
    return arrayObjects.map((object, index) => {
        object.address = addresses[index];
        return object;
    });
};

async function updateVoters(id, voters) {
    return await new Promise((resolve, reject) => {
        db.update({_id: id}, {$set: {voters: voters}}, (err, election) => {
            if (err) reject(err);
            resolve(election)
        });
    })
}

async function updateCandidates(id, candidates) {
    return await new Promise((resolve, reject) => {
        db.update({_id: id}, {$set: {candidates: candidates}}, (err, election) => {
            if (err) reject(err);
            resolve(election)
        });
    })
}

let isContinues = (dateStart, dateEnd) => {
    let nowDate = new Date();
    let isStarting = nowDate >= new Date(dateStart);
    let isEnding = nowDate > new Date(dateEnd);
    return isStarting && !isEnding;
};

async function remove(id, organizer) {
    let election = await getElection(id, organizer);
    return await new Promise((resolve, reject) => {
        if (!isContinues(election[0].dtStart, election[0].dtEnd)) {
            db.remove({organizer: organizer, _id: id,}, (err, election) => {
                if (err) reject(err);
                resolve(election)
            });
        } else {
            resolve([{"errors": "Невозможно удалить выборы, до тех пор пока они не будут завершены!"}]);
        }
    })
}

async function getElection(id, organizer) {
    return await new Promise((resolve, reject) => {
        db.find({organizer: organizer, _id: id}, (err, election) => {
            if (err) reject(err);
            resolve(election)
        });
    });
}

async function getElectionByVoterUuid(uuid) {
    return await new Promise((resolve, reject) => {
        db.find({"voters.uuid": uuid}, (err, election) => {
            if (err) reject(err);
            resolve(election)
        });
    });
}

async function getElections(organizer) {
    return await new Promise((resolve, reject) => {
        db.find({organizer: organizer}, (err, election) => {
            if (err) reject(err);
            resolve(election)
        });
    });
}

module.exports = {add, remove, getElection, getElectionByVoterUuid, getElections, isContinues};