"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
const availableResolution = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'];
const videos = [
    {
        id: 0,
        title: 'string',
        author: 'string',
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: '2024-01-08T00:49:47.128Z',
        publicationDate: '2024-01-08T00:49:47.128Z',
        availableResolutions: ['P144'],
    },
    {
        id: 1,
        title: 'Example Video 1',
        author: 'John Doe',
        canBeDownloaded: true,
        minAgeRestriction: 12,
        createdAt: '2024-01-08T10:00:00.000Z',
        publicationDate: '2024-01-08T10:00:00.000Z',
        availableResolutions: ['P240', 'P480', 'P720'],
    },
    {
        id: 2,
        title: 'Sponge Bob',
        author: 'Nickelodeon',
        canBeDownloaded: true,
        minAgeRestriction: 3,
        createdAt: '2024-01-09T08:30:00.000Z',
        publicationDate: '2024-01-09T08:30:00.000Z',
        availableResolutions: ['P1080', 'P1440', 'P2160'],
    },
    {
        id: 3,
        title: 'Nature Documentary',
        author: 'National Geographic',
        canBeDownloaded: true,
        minAgeRestriction: 8,
        createdAt: '2024-01-10T15:45:00.000Z',
        publicationDate: '2024-01-10T15:45:00.000Z',
        availableResolutions: ['P360', 'P720', 'P1080'],
    },
];
exports.app.get('/videos', (req, res) => {
    res.send(videos);
});
exports.app.get('/videos/:id', (req, res) => {
    const id = +req.params.id;
    const video = videos.find((v) => v.id === id);
    if (!video) {
        res.sendStatus(404);
        return;
    }
    res.send(video);
});
exports.app.put('/videos/:id', (req, res) => {
    const id = +req.params.id;
    const indexOfVideo = videos.findIndex((p) => p.id === id);
    if (indexOfVideo === -1) {
        res.sendStatus(404);
        return;
    }
    const errors = {
        errorsMessages: [],
    };
    let { title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate } = req.body;
    if (!title || typeof title !== 'string' || !title.trim() || title.trim().length > 40) {
        errors.errorsMessages.push({ message: 'Incorrect title!', field: 'title' });
    }
    if (!author || typeof author !== 'string' || !author.trim() || author.trim().length > 20) {
        errors.errorsMessages.push({ message: 'Incorrect author!', field: 'author' });
    }
    if (!Array.isArray(availableResolutions)) {
        availableResolutions = [];
    }
    else {
        availableResolutions.forEach((r) => {
            if (!availableResolution.includes(r)) {
                errors.errorsMessages.push({ message: 'Incorrect availableResolution!', field: 'availableResolutions' });
            }
        });
    }
    if (minAgeRestriction !== null && minAgeRestriction !== undefined) {
        if (!Number.isInteger(minAgeRestriction) || minAgeRestriction < 1 || minAgeRestriction > 18) {
            errors.errorsMessages.push({ message: 'Incorrect minAgeRestriction!', field: 'minAgeRestriction' });
        }
    }
    if (canBeDownloaded === undefined) {
        canBeDownloaded = false;
    }
    if (canBeDownloaded !== true && canBeDownloaded !== false) {
        errors.errorsMessages.push({ message: 'Incorrect canBeDownloaded!', field: 'canBeDownloaded' });
    }
    if (errors.errorsMessages.length) {
        res.status(400).send(errors);
        return;
    }
    const updatedVideo = {
        id,
        canBeDownloaded: req.body.canBeDownloaded || false,
        minAgeRestriction: req.body.minAgeRestriction || videos[indexOfVideo].minAgeRestriction,
        createdAt: videos[indexOfVideo].createdAt,
        publicationDate: req.body.publicationDate || videos[indexOfVideo].publicationDate,
        title: req.body.title,
        author: req.body.author,
        availableResolutions,
    };
    videos[indexOfVideo] = updatedVideo;
    res.status(204).send(updatedVideo);
});
exports.app.post('/videos', (req, res) => {
    const errors = {
        errorsMessages: [],
    };
    let { title, author, availableResolutions, canBeDownloaded, minAgeRestriction } = req.body;
    if (!title || typeof title !== 'string' || !title.trim() || title.trim().length > 40) {
        errors.errorsMessages.push({ message: 'Incorrect title!', field: 'title' });
    }
    if (!author || typeof author !== 'string' || !author.trim() || author.trim().length > 20) {
        errors.errorsMessages.push({ message: 'Incorrect author!', field: 'author' });
    }
    if (!Array.isArray(availableResolutions)) {
        availableResolutions = [];
    }
    else {
        availableResolutions.forEach((r) => {
            if (!availableResolution.includes(r)) {
                errors.errorsMessages.push({ message: 'Incorrect availableResolution!', field: 'availableResolutions' });
            }
        });
    }
    if (canBeDownloaded === undefined) {
        canBeDownloaded = false;
    }
    if (canBeDownloaded !== true && canBeDownloaded !== false) {
        errors.errorsMessages.push({ message: 'Incorrect canBeDownloaded!', field: 'canBeDownloaded' });
    }
    if (minAgeRestriction !== null && minAgeRestriction !== undefined) {
        if (!Number.isInteger(minAgeRestriction) || minAgeRestriction < 1 || minAgeRestriction > 18) {
            errors.errorsMessages.push({ message: 'Incorrect minAgeRestriction!', field: 'minAgeRestriction' });
        }
    }
    if (errors.errorsMessages.length) {
        res.status(400).send(errors);
        return;
    }
    const createdAt = new Date();
    const publicationDate = new Date();
    publicationDate.setDate(createdAt.getDate() + 1);
    const newVideo = {
        id: +(new Date()),
        canBeDownloaded: req.body.canBeDownloaded || false,
        minAgeRestriction: req.body.minAgeRestriction || null,
        createdAt: createdAt.toISOString(),
        publicationDate: publicationDate.toISOString(),
        title,
        author,
        availableResolutions,
    };
    videos.push(newVideo);
    res.status(201).send(newVideo);
});
exports.app.delete('/testing/all-data', (req, res) => {
    videos.length = 0;
    res.sendStatus(204);
});
exports.app.delete('/videos/:id', (req, res) => {
    const id = +req.params.id;
    const indexOfVideoForDeleting = videos.findIndex((v) => v.id === id);
    if (indexOfVideoForDeleting !== -1) {
        videos.splice(indexOfVideoForDeleting, 1);
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
});
