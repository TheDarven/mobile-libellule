
const oneToMany = (single, multiple, relation) => 
{
    multiple.hasMany(single, relation);
    single.belongsTo(multiple, relation);
};

module.exports = { oneToMany };