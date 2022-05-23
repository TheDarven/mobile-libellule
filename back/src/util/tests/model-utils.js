const { loginUser, registerUser, getUserByName } = require("../../service/user-service");

async function getUser(name, password)
{
    try {
        const data = await loginUser(name, password);

        const token = data.data;
        const id = await getUserByName(name);

        return { token, id };
    } catch(err) {
        const data = await registerUser(name, password);
        const user = await getUserByName(name);

        const token = data.data;
        const id = user.userId;

        return { token, id };
    }
}

module.exports = { getUser }