const express = require("express");
const tripController = require("../trip/tripController");
const extract = require("../middleware/extract");
const tripRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Trip
 *   description: API for managing trip
 */

/**
 * @swagger
 * /api/v1/trip:
 *   post:
 *     summary: Create a new trip
 *     tags: [Trip]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               location:
 *                 type: string
 *               thumbnail:
 *                 type: string
 *               gps:
 *                 type: string
 *               hashtag:
 *                 type: string
 *               hidden:
 *                 type: string          
 *             example:
 *               id: 46 
 *               user_id: 3
 *               schedule_id: null
 *               title: "타이틀입니다."
 *               content: "16847499509811630652987056_0.jpg "
 *               likes: 0
 *               liked_by: []
 *               views: 0
 *               location: "지역"
 *               gps: "35.89421911,139.94637467"
 *               started_at: "2023-05-20T18:32:50.000Z"
 *               end_at: "2023-05-20T18:32:50.000Z"
 *               hashtag: ["a", "b", "c"]
 *               hidden: true
 *               thumbnail: "https://abc.com/image/23424234" 
 *               created_at: "2023-05-23 22:05:55.463"
 *               updated_at: "2023-05-23 22:05:55.463"
 *               deleted_at: null           
 *     responses:
 *       '200':
 *         description: Successfully created the trip
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 trip:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     content:
 *                       type: string
 *                     location:
 *                       type: string
 *                     thumbnail:
 *                       type: string
 *                     gps:
 *                       type: string
 *                     hashtag:
 *                       type: string
 *                     hidden:
 *                       type: string
 *                   example:
 *                       id: 46 
 *                       user_id: 3
 *                       schedule_id: null
 *                       title: "타이틀입니다."
 *                       content: "16847499509811630652987056_0.jpg "
 *                       likes: 0
 *                       liked_by: []
 *                       views: 0
 *                       location: "지역"
 *                       gps: "35.89421911,139.94637467"
 *                       started_at: "2023-05-20T18:32:50.000Z"
 *                       end_at: "2023-05-20T18:32:50.000Z"
 *                       hashtag: ["a", "b", "c"]
 *                       hidden: true
 *                       thumbnail: "https://abc.com/image/23424234" 
 *                       created_at: "2023-05-23 22:05:55.463"
 *                       updated_at: "2023-05-23 22:05:55.463"
 *                       deleted_at: null
 *       '400':
 *         description: trip not found
 *       '500':
 *         description: Internal Server Error. 
 */

/**
 * @swagger
 * /api/v1/trip:
 *   put:
 *     summary: Update a trip
 *     tags: [Trip]
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID of the trip to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               location:
 *                 type: string
 *               thumbnail:
 *                  type: string
 *               gps:
 *                  type: string
 *               hashtag:
 *                  type: string
 *               hidden:
 *                  type: string
 *             example:
 *               id: 46 
 *               user_id: 3
 *               schedule_id: null
 *               title: "타이틀입니다."
 *               content: "16847499509811630652987056_0.jpg "
 *               likes: 0
 *               views: 0
 *               location: "지역"
 *               gps: "35.89421911,139.94637467"
 *               started_at: "2023-05-20T18:32:50.000Z"
 *               end_at: "2023-05-20T18:32:50.000Z"
 *               hashtag: ["a", "b", "c"]
 *               hidden: true
 *               thumbnail: "https://abc.com/image/23424234" 
 *               created_at: "2023-05-23 22:05:55.463"
 *               updated_at: "2023-05-23 22:05:55.463"
 *               deleted_at: null
 *     responses:
 *       '200':
 *         description: Successfully updated the image
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 trip:
 *                   type: object
 *                   properties:
 *                     title:
 *                        type: string
 *                     content:
 *                        type: string
 *                     location:
 *                        type: string
 *                     thumbnail:
 *                        type: string
 *                     gps:
 *                        type: string
 *                     hashtag:
 *                        type: string
 *                     hidden:
 *                        type: string
 *                   example:
 *                     id: 46 
 *                     user_id: 3
 *                     schedule_id: null
 *                     title: "타이틀입니다."
 *                     content: "16847499509811630652987056_0.jpg "
 *                     likes: 0                      
 *                     views: 0
 *                     location: "지역"
 *                     gps: "35.89421911,139.94637467"
 *                     started_at: "2023-05-20T18:32:50.000Z"
 *                     end_at: "2023-05-20T18:32:50.000Z"
 *                     hashtag: ["a", "b", "c"]
 *                     hidden: true
 *                     thumbnail: "https://abc.com/image/23424234" 
 *                     created_at: "2023-05-23 22:05:55.463"
 *                     updated_at: "2023-05-23 22:05:55.463"
 *                     deleted_at: null
 *       '400':
 *         description: trip not found
 *       '500':
 *         description: Internal Server Error. 
 *
 *   get:
 *     summary: Get all trips
 *     tags: [Trip]
 *     responses:
 *       '200':
 *         description: Successfully retrieved the trip
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *               example:
 *                   - id: 46 
 *                     user_id: 3
 *                     schedule_id: null
 *                     title: "타이틀입니다."
 *                     content: "16847499509811630652987056_0.jpg "
 *                     likes: 0
 *                     views: 0
 *                     location: "지역"
 *                     gps: "35.89421911,139.94637467"
 *                     started_at: "2023-05-20T18:32:50.000Z"
 *                     end_at: "2023-05-20T18:32:50.000Z"
 *                     hashtag: ["a", "b", "c"]
 *                     hidden: true
 *                     thumbnail: "https://abc.com/image/23424234" 
 *                     created_at: "2023-05-23 22:05:55.463"
 *                     updated_at: "2023-05-23 22:05:55.463"
 *                     deleted_at: null
 *                   - id: 47 
 *                     user_id: 4
 *                     schedule_id: null
 *                     title: "타이틀입니다2"
 *                     content: "16847499509811630652987056_0.jpg "
 *                     likes: 0
 *                     views: 0
 *                     location: "지역2"
 *                     gps: "35.89421911,139.94637467"
 *                     started_at: "2023-05-20T18:32:50.000Z"
 *                     end_at: "2023-05-20T18:32:50.000Z"
 *                     hashtag: "태그입니다"
 *                     hidden: true
 *                     thumbnail: "https://abc.com/image/23424234" 
 *                     created_at: "2023-05-23 22:05:55.463"
 *                     updated_at: "2023-05-23 22:05:55.463"
 *                     deleted_at: null
 *       '400':
 *         description: trip not found
 *       '500':
 *         description: Internal Server Error. 
 * 
 *   delete:
 *     summary: Delete a trip
 *     tags: [Trip]
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID of the image to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully deleted the image
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "trip deleted successfully"
 *       '400':
 *         description: trip not found
 *       '500':
 *         description: Internal Server Error. 
 */

/**
 * @swagger
 * /api/v1/trip/detail:
*   get:
 *     summary: Get a specific trip
 *     tags: [Trip]
 *     description: 트립 ID를 사용, 트립 데이터를 가져오기.
 *     parameters:
 *       - in: query
 *         name: id
 *         description: 이미지 ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: 트립 데이터 불러오기
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *               example:
 *                 id: 46 
 *                 user_id: 3
 *                 schedule_id: null
 *                 title: "타이틀입니다."
 *                 content: "16847499509811630652987056_0.jpg "
 *                 likes: 0
 *                 views: 0
 *                 location: "지역"
 *                 gps: "35.89421911,139.94637467"
 *                 started_at: "2023-05-20T18:32:50.000Z"
 *                 end_at: "2023-05-20T18:32:50.000Z"
 *                 hashtag: ["a", "b", "c"]
 *                 hidden: true
 *                 thumbnail: "https://abc.com/image/23424234" 
 *                 created_at: "2023-05-23 22:05:55.463"
 *                 updated_at: "2023-05-23 22:05:55.463"
 *                 deleted_at: null
 *       '400':
 *         description: trip not found
 *       '500':
 *         description: Internal Server Error. 
 */

tripRouter.post("/", tripController.postTrip);
tripRouter.get("/detail", tripController.getTrip);
tripRouter.get("/", tripController.getTrips);
tripRouter.put("/", tripController.updateTrip);
tripRouter.delete("/", tripController.deleteTrip);


/**
 * @swagger
 * /like/{tripId}:
 *   post:
 *     summary: Add likes of trip
 *     tags: [Trip]
 *     parameters:
 *       - in: path
 *         name: tripId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the trip to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The updated content of the trip
 *     responses:
 *       '200':
 *         description: likes of trip add successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *               example:
 *                 likes: 3
 *                 liked_by: [3,4,5]
 *       '404':
 *         description: Trip not found
 *       '500':
 *         description: Internal Server Error. 
 */

/**
 * @swagger
 * /like/{tripId}:
 *   delete:
 *     summary: Delete likes of trip
 *     tags: [Trip]
 *     parameters:
 *       - in: path
 *         name: tripId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the trip to delete
 *     responses:
 *       '200':
 *         description: lieks of Trip deleted successfully
 *       '404':
 *         description: trip not found
 *       '500':
 *         description: Internal Server Error. 
 */

//좋아요 기능 - 추가/ 삭제
tripRouter.post("/like/:tripId", tripController.addLikeToTrip);
tripRouter.delete("/like/:tripId", tripController.removeLikeFromTrip);

module.exports = tripRouter;