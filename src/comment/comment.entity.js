const { EntitySchema } = require("typeorm");
const User = require("../user/User");
const Trip = require("../trip/Trip");

// +------------+-----------+------+-----+-------------------+-----------------------------------------------+
// | Field      | Type      | Null | Key | Default           | Extra                                         |
// +------------+-----------+------+-----+-------------------+-----------------------------------------------+
// | comment_id | bigint    | NO   | PRI | NULL              | auto_increment                                |
// | user_id    | bigint    | NO   | MUL | NULL              |                                               |
// | trip_id    | bigint    | NO   | MUL | NULL              |                                               |
// | parent_id  | bigint    | YES  | MUL | NULL              |                                               |
// | content    | text      | YES  |     | NULL              |                                               |
// | created_at | timestamp | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
// | updated_at | timestamp | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
// | likes      | int       | NO   |     | 0                 |                                               |
// +------------+-----------+------+-----+-------------------+-----------------------------------------------+

const commentSchema = new EntitySchema({
  name: "Comment",
  tableName: "comment",
  columns: {
    comment_id: {
      type: "bigint",
      primary: true,
      generated: true,
    },
    user_id: {
      type: "bigint",
    },
    trip_id: {
      type: "bigint",
    },
    parent_id: {
      type: "bigint",
      nullable: true,
    },
    content: {
      type: "text",
      nullable: true,
    },
    created_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
    updated_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
      onUpdate: "CURRENT_TIMESTAMP",
    },
    likes: {
      type: "integer",
      default: 0,
    },
    liked_by: {
      type: "varchar",
      nullable: true,
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: () => User,
      joinColumn: { name: "user_id" },
    },
    trip: {
      type: "many-to-one",
      target: () => Trip,
      joinColumn: { name: "trip_id" },
    },
    parentComment: {
      type: "many-to-one",
      target: "Comment",
      joinColumn: { name: "parent_id" },
      nullable: true,
    },
    childComments: {
      type: "one-to-many",
      target: "Comment",
      mappedBy: "parentComment",
    },
  },
  methods: {
    incrementLikes() {
      if (!this.liked_by.includes(String(this.user_id))) {
        this.likes++;
        if (this.liked_by) {
          this.liked_by += ",";
        }
        this.liked_by += String(this.user_id);
        this.save();
      }
    },
    decrementLikes() {
      const userIdString = String(this.user_id);
      if (this.liked_by.includes(userIdString)) {
        this.likes--;
        this.liked_by = this.liked_by
          .split(",")
          .filter(userId => userId !== userIdString)
          .join(",");
        this.save();
      }
    },
  },
});

module.exports = commentSchema;
