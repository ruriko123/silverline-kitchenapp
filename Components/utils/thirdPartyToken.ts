var hat = require('hat');

const thirdPartyToken = async() => {
    var rack = await hat.rack();
    let id = await rack();
    return id;
}


export {thirdPartyToken};