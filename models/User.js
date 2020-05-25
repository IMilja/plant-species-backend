const Password = require('objection-password')();
const BaseModel = require('./BaseModel');

class User extends Password(BaseModel) {
  static get tableName() {
    return 'user';
  }

  static get relationMappings() {
    return {
      role: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'Role',
        join: {
          from: 'user.role_id',
          to: 'role.id',
        },
      },
    };
  }
}

module.exports = User;
