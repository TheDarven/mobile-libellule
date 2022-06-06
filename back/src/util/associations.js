
const oneToMany = (single, multiple, relation) => 
{
    relation.onDelete = 'cascade';
    relation.onUpdate = 'cascade';

    multiple.hasMany(single, relation);
    single.belongsTo(multiple, relation);
};

module.exports = { oneToMany };