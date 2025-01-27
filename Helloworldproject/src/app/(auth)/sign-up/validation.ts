
const schema = new PasswordValidator();
schema
  .is().min(8)
  .is().max(20)
  .has().uppercase()
  .has().lowercase()
  .has().digits()
  .has().not().spaces();
