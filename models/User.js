const Password = require('objection-password')();
const visibilityPlugin = require('objection-visibility').default;
const BaseModel = require('./BaseModel');

class User extends visibilityPlugin(Password(BaseModel)) {
  static get tableName() {
    return 'user';
  }

  static get hidden() {
    return [
      'password',
      'active',
      'activationHash',
      'passwordResetHash',
      'createdAt',
    ];
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
