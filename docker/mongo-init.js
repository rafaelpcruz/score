db.createUser({
  user: 'score_user',
  pwd: 'score_pwd',
  roles: [
    {
      role: 'readWrite',
      db: 'scoredb',
    },
  ],
});
