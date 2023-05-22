const typeORMDataSource = require("../util/connect/typeorm");
const Comment = require("../comment/comment.entity");

const logger = require("../util/logger/logger");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");

const repository = typeORMDataSource.getRepository(Comment);

const commentRepository = {
  /**
   * Creates a new comment.
   * @param {Object} comment - The comment object.
   * @returns {Object} The created comment.
   */
  async create(comment) {
    try {
      const newComment = repository.create(comment);
      await repository.save(newComment);
      return newComment;
    } catch (error) {
      logger.info(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },
  /**
   * Finds a comment by comment ID.
   * @param {string} commentId - The ID of the comment to find.
   * @returns {Object} The found comment.
   */
  async findById(commentId) {
    try {
      const comment = await repository.findOne({ id: commentId });
      return comment;
    } catch (error) {
      logger.info(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },
  /**
   * Finds comments by trip ID.
   * @param {string} tripId - The ID of the trip to find comments for.
   * @returns {Array} An array of comments.
   */
  async findByTripId(tripId) {
    try {
      const comments = await repository.find({ where: { trip_id: tripId } });
      return comments;
    } catch (error) {
      logger.info(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },
  /**
   * Updates a comment by comment ID.
   * @param {string} commentId - The ID of the comment to update.
   * @param {Object} updatedComment - The updated comment object.
   * @returns {Object} The updated comment.
   */
  async update(commentId, updatedComment) {
    try {
      const commentToUpdate = await repository.findOne(commentId);
      if (!commentToUpdate) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          404,
          "Comment Not Found"
        );
      }
      await repository.update(commentId, updatedComment);
      return commentToUpdate;
    } catch (error) {
      logger.info(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },
  /**
   * Retrieves all comments.
   * @returns {Array} An array of comments.
   */
  async getAllComment() {
    try {
      const allComment = await repository.find();
      return allComment;
    } catch (error) {
      logger.info(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },
  /**
   * Deletes a comment by comment ID.
   * @param {string} commentId - The ID of the comment to delete.
   */
  async delete(commentId) {
    try {
      const commentToDelete = await repository.findOne(commentId);
      if (!commentToDelete) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          404,
          "Comment Not Found"
        );
      }
      await commentRepository.remove(commentToDelete);
    } catch (error) {
      logger.info(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },
};

module.exports = commentRepository;
