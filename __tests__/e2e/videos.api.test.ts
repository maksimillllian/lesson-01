import request from 'supertest';
import { app } from '../../src/settings';

describe('GET /videos', () => {
    it('responds with json containing a list of videos', async () => {
        const response = await request(app).get('/videos');
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1); // Assuming there's one video in the array
    });
});

describe('GET /videos/:id', () => {
    it('responds with json containing a single video', async () => {
        const response = await request(app).get('/videos/0');
        expect(response.status).toBe(200);
        expect(response.body.title).toBe('string');
        // Add more assertions based on your video object structure
    });

    it('responds with 404 if video is not found', async () => {
        const response = await request(app).get('/videos/999');
        expect(response.status).toBe(404);
    });
});

describe('POST /videos', () => {
    it('creates a new video', async () => {
        const newVideo = {
            title: 'New Title',
            author: 'New Author',
            availableResolutions: ['P144'],
        };

        const response = await request(app)
            .post('/videos')
            .send(newVideo);

        expect(response.status).toBe(201);
        expect(response.body.title).toBe('New Title');
        // Add more assertions based on your expected response
    });

    it('responds with 400 if invalid data is sent', async () => {
        const invalidVideo = {
            // Invalid video data, missing title for example
            author: 'Invalid Author',
            availableResolutions: ['P144'],
        };

        const response = await request(app)
            .post('/videos')
            .send(invalidVideo);

        expect(response.status).toBe(400);
        // Add more assertions based on your error response
    });
});

describe('DELETE /testing/all-data', () => {
    it('deletes all videos', async () => {
        const response = await request(app).delete('/testing/all-data');
        expect(response.status).toBe(204);

        // Ensure that videos array is empty after deletion
        const videosResponse = await request(app).get('/videos');
        expect(videosResponse.body).toHaveLength(0);
    });
});
