db.createUser(
        {
            user: "kieutrilang",
            pwd: "123456",
            roles: [
                {
                    role: "readWrite",
                    db: "profydb"
                }
            ]
        }
);