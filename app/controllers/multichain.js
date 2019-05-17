let multichain = require("multichain-node")({
    port: 9266,
    host: '134.0.113.150',
    user: "multichainrpc",
    pass: "4Nn5taKxRHNZrxZQNT8af3akfFcDgTmcgExhLCBrYJHi",
});

let generateNewAddress = async () => {
    return await new Promise((resolve) => {
        multichain.getNewAddress((err, address) => {
            if (err) resolve(err);
            resolve(address);
        });
    });
};

let createVoteToken = async data => {
    return await new Promise((resolve) => {
        multichain.issue({
                address: data.address,
                asset: data.asset,
                qty: data.count,
                units: 1,
                details: {
                    title: data.title
                }
            }, (err) => {
                if (err) resolve(err);
                resolve([]);
            }
        );
    });
};

let createWallet = async (transaction) => {
    multichain.sendWithMetadataFrom(transaction, (err, tx) => {
        // TODO Kibana Errors
        if (err) console.log(err);
    });
};

let getAddressBalance = async (address) => {
    return await new Promise((resolve) => {
        multichain.getAddressBalances(({address: address}), (err, balance) => {
            if (err) resolve(err);
            if (typeof balance !== 'undefined' && balance.length > 0) {
                resolve(balance[0].qty);
            } else {
                resolve([]);
            }
        })
    });
};

let createVotersWallet = async (assetInfo, uuidArray) => {
    let votersAddress = [];
    let promise = await uuidArray.map(async function (uuid) {
        let newAddress = await generateNewAddress();
        await createWallet({
            from: assetInfo.address,
            to: newAddress,
            amount: {[assetInfo.asset]: 1},
            data: new Buffer(uuid, 'utf8').toString('hex')
        });
        return newAddress;
    });
    await Promise.all(promise).then((completed) => {
        votersAddress = completed
    });
    return await votersAddress;
};

let createCandidatesWallet = async (assetInfo, uuidArray) => {
    let candidatesAddress = [];
    let promise = await uuidArray.map(async function (uuid) {
            let newAddress = await generateNewAddress();
            await createWallet({
                from: assetInfo.address,
                to: newAddress,
                amount: {[assetInfo.asset]: 0},
                data: new Buffer(uuid, 'utf8').toString('hex')
            });
            return newAddress;
        }
    );
    await Promise.all(promise).then((completed) => {
        candidatesAddress = completed
    });
    return await candidatesAddress;
};

let create = async (query) => {
    let assetInfo = {
        address: await generateNewAddress(),
        asset: query.token,
        title: query.title,
        count: query.votersUuids.length
    };
    let resultCreationToken = await createVoteToken(assetInfo);

    if (resultCreationToken.length === 0) {
        return {
            "addressVoters": await createVotersWallet(assetInfo, query.votersUuids),
            "addressCandidates": await createCandidatesWallet(assetInfo, query.candidatesUuids)
        }
    } else {
        //TODO Errors to Kibana
        console.log(resultCreationToken);
    }
};

let sendVoteToken = async (voterAddress, candidateAddress, asset) => {
    return await new Promise((resolve) => {
        multichain.sendAssetFrom({
            from: voterAddress,
            to: candidateAddress,
            asset: asset,
            qty: 1
        }, (err, tx) => {
            if (err) resolve(err);
            resolve([]);
        });
    });
};

module.exports = {create, sendVoteToken, getAddressBalance};