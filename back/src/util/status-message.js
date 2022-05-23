module.exports = {
    DEFAULT_ERROR: 'Une erreur est apparue, réessayez plus tard',
    INVALID_BODY_DATA: 'Certains paramètres n\'existent pas ou sont invalides',
    TOKEN_NOT_PRESENT: 'Le token d\'authentification n\'est pas présent dans l\'entête de la requête',
    INVALID_TOKEN: 'Le token d\'authentification n\'est pas valide',
    INVALID_TOKEN_USER: 'L\'utilisateur authentifié n\'existe pas',

    // USER
    USER_BODY_INVALID_NAME_LENGTH: 'Le nom doit posséder entre 3 et 120 caractères',
    USER_BODY_INVALID_NAME_FORMAT: 'Le nom ne doit pas posséder d\'espace et de caractères spéciaux',
    USER_BODY_INVALID_PASSWORD_LENGTH: 'Le mot de passe doit posséder entre 4 et 120 caractères',
    USER_NOT_EXISTING: 'Aucun utilisateur ne correspond à ces identifiants',
    USER_NAME_ALREADY_USE: 'Ce nom est déjà utilisé par un autre utilisateur',
    USER_CREATION_FAILED: 'Une erreur inconnue s\'est produite lors de l\'inscription. Merci de réessayer plus tard.',
    USER_LOGGED_WITH_SUCCESS: 'Vous vous êtes connecté avec succès',
    USER_CREATED_WITH_SUCCESS: 'Vous vous êtes inscrit avec succès',

    // QUESTION
    QUESTION_BODY_INVALID_CONTENT_LENGTH: 'Le contenu doit posséder moins de 10000 caractères',
    QUESTION_BODY_INVALID_TITLE_LENGTH: 'Le titre doit posséder entre 5 et 255 caractères',
    QUESTION_CREATION_FAILED: 'Une erreur inconnue s\'est produite lors de la création. Merci de réessayer plus tard.',
    QUESTION_EDITION_FAILED: 'Une erreur inconnue s\'est produite lors de l\'édition. Merci de réessayer plus tard.',
    QUESTION_DELETION_FAILED: 'Une erreur inconnue s\'est produite lors de la suppresion. Merci de réessayer plus tard.',
    QUESTION_CREATED_WITH_SUCCESS: 'Vous avez créé une question avec succès',
    QUESTION_EDITED_WITH_SUCCESS: 'Vous avez édité une question avec succès',
    QUESTION_DELETED_WITH_SUCCESS: 'Vous avez supprimé une question avec succès',
    QUESTION_MISSING_PERMISSION: 'Vous n\'avez pas la permission pour effectuer cette opération',
}
