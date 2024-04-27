// cognitoUserBuilder.js
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

class CognitoUserBuilder {
  constructor() {
    this.user = {
      attributeList: [],
    };
  }

  withName(name) {
    const dataName = {
      Name: 'name',
      Value: name,
    };
    const attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(dataName);
    this.user.attributeList.push(attributeName);
    return this;
  }

  withEmail(email) {
    const dataEmail = {
      Name: 'email',
      Value: email,
    };
    const attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
    this.user.attributeList.push(attributeEmail);
    return this;
  }

  build() {
    return this.user;
  }
}

module.exports = CognitoUserBuilder;
