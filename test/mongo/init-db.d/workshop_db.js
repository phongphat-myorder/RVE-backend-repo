db = db.getSiblingDB("workshop_db");
db.responses.drop();
db.responses.insertMany([
  {
    result: "success",
    sender: "user1@gmail.com",
    created_at: ISODate("2025-01-10T13:47:51.242Z"),
    updated_at: ISODate("2025-01-10T13:47:51.242Z"),
  },
  {
    result: "fail",
    sender: "user1@gmail.com",
    created_at: ISODate("2025-01-10T13:50:51.242Z"),
    updated_at: ISODate("2025-01-10T13:50:51.242Z"),
  },
]);
