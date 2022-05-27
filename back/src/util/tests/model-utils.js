const { loginUser, registerUser, getUserByName } = require("../../service/user-service");
const { createQuestion, getQuestionByTitle } = require("../../service/question-service");
const { CodeError } = require("../error-handler");
const { QUESTION_NOT_IDENTIFIED } = require("../status-message");

async function getUser(name, password)
{
    try {
        const data = await loginUser(name, password);
        const user = await getUserByName(name);

        const token = data.data;
        const id = user.userId;

        return { token, id, user };
    } catch(err) {
        const data = await registerUser(name, password);
        const user = await getUserByName(name);

        const token = data.data;
        const id = user.userId;

        return { token, id, user };
    }
}

async function getQuestion(title, content, user)
{
    try {
        const question = await getQuestionByTitle(title);
        if (question == null) {
            throw new CodeError(QUESTION_NOT_IDENTIFIED);
        }
        return question;
    } catch(err) {
        await createQuestion(content, title, user);
        return await getQuestionByTitle(title);
    }
}

module.exports = { getUser, getQuestion }