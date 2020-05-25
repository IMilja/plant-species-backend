const BaseModel = require('./BaseModel');

class User extends BaseModel {
  static get tableName() {
    return 'role';
  }

  static get relationMappings() {
    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'User',
        join: {
          from: 'role.id',
          to: 'user.role_id',
        },
      },
    };
  }
}

module.exports = User;
