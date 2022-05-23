const userModel = require('../model/user')
const { USER_NOT_EXISTING, USER_LOGGED_WITH_SUCCESS, USER_NAME_ALREADY_USE, USER_CREATED_WITH_SUCCESS,
    USER_CREATION_FAILED
} = require("../util/status-message");
const { CodeError } = require("../util/error-handler");
const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function loginUser(name, password) {
    // Verify identification
    const user = await userModel.findOne({
       where: { name }
    })
    if (!user || !bcrypt.compareSync(password, user.password)) {
        throw new CodeError(USER_NOT_EXISTING, httpStatus.NOT_FOUND)
    }

    return {
        response: USER_LOGGED_WITH_SUCCESS,
        data: createJwtToken(user)
    }
}

async function registerUser(name, password) {
    // Verify if name already use
    const userWithSameName = await userModel.findOne({
        where: { name }
    })
    if (userWithSameName != null) {
        throw new CodeError(USER_NAME_ALREADY_USE, httpStatus.NOT_FOUND)
    }

    // Create user
    try {
        // Fetch user name from external API
        const generatedName = await getRandomUsername()
        const user = await userModel.create({ name, password, displayName: generatedName })
        return {
            response: USER_CREATED_WITH_SUCCESS,
            data: createJwtToken(user)
        }
    } catch (err) {
        throw new CodeError(USER_CREATION_FAILED, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

async function getUserById(userId) {
    try {
        return await userModel.findOne({
            where: {
                userId
            }
        })
    } catch (err) {
        return null
    }
}

async function getUserByName(name) {
    try {
        return await userModel.findOne({
            where: {
                name
            }
        })
    } catch (err) {
        return null;
    }
}

function createJwtToken(user) {
    // Build jwt token
    const secret = process.env.JWT_SECRET_KEY
    const algorithm = process.env.JWT_ALGORITHM
    const expiresIn = process.env.JWT_EXPIRES_IN
    return jwt.sign({ data: { name: user.name, userId: user.userId } }, secret, { expiresIn, algorithm });
}

function getRandomUsername() {
    // Gathering common insect names from north america
    const filter = {
        "classificationOptions": {
            "includeInfraspecies": false,
            "includeNonstandard": false,
            "includeProvisional": false
        },
        "criteriaType": "species",
        "locationOptions": {
            "origin": "all"
        },
        "pagingOptions": {
            "page": 0,
            "recordsPerPage": 4500
        },
        "recordSubtypeCriteria": null,
        "speciesTaxonomyCriteria": [
            {
                "informalTaxonomy": "Insects - Bees",
                "paramType": "informalTaxonomy"
            },
            {
                "informalTaxonomy": "Insects - Flies",
                "paramType": "informalTaxonomy"
            },
            {
                "informalTaxonomy": "Insects - Damselflies and Dragonflies",
                "paramType": "informalTaxonomy"
            },
            {
                "informalTaxonomy": "Insects - Caddisflies, Mayflies, and Stoneflies",
                "paramType": "informalTaxonomy"
            },
            {
                "informalTaxonomy": "Insects - Butterflies and Moths",
                "paramType": "informalTaxonomy"
            },
            {
                "informalTaxonomy": "Insects - Beetles",
                "paramType": "informalTaxonomy"
            },
            {
                "informalTaxonomy": "Insects - Other",
                "paramType": "informalTaxonomy"
            }
        ]
    };
    const res = fetch('https://explorer.natureserve.org/api/data/speciesSearch', {
        method: 'POST',
        body: JSON.stringify(filter),
        headers: { 'Content-Type': 'application/json' }
    });
    return res.then((names) => names.json().then((json) =>{
        const index = Math.floor(Math.random() * (json.results.length));
        const nameList = json.results.map((data) => data.primaryCommonName);
        return nameList[index];
    }))
}

module.exports = { loginUser, registerUser, getUserById, getUserByName, createJwtToken }
