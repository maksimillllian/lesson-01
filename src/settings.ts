import express, { Request, Response } from 'express';
import request from 'supertest';

export const app = express();

app.use(express.json());

const availableResolution = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'];

type VideoType = {
    id: number;
    title: string;
    author: string;
    canBeDownloaded: boolean;
    minAgeRestriction: number | null;
    createdAt: string;
    publicationDate: string;
    availableResolutions: typeof availableResolution;
};

const videos: VideoType[] = [
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


type RequestWithParams<P> = Request<P, unknown, unknown, unknown>;

type Param = {
    id: number;
};

type RequestWithBody<B> = Request<unknown, unknown, B, unknown>;

type CreateVideoType = {
    title: string;
    author: string;
    availableResolutions: typeof availableResolution;
};

type ErrorMessageType = {
    field: string;
    message: string;
};

type ErrorType = {
    errorsMessages: ErrorMessageType[];
};

app.get('/videos', (req: Request, res: Response) => {
    res.send(videos);
});

app.get('/videos/:id', (req: RequestWithParams<Param>, res: Response) => {
    const id = +req.params.id;

    const video = videos.find((v) => v.id === id);

    if (!video) {
        res.sendStatus(404);
        return;
    }
    res.send(video);
});

app.post('/videos', (req: RequestWithBody<any>, res: Response) => {
    const errors: ErrorType = {
        errorsMessages: [],
    };
    let { title, author, availableResolutions } = req.body;
    if (!title || typeof title !== 'string' || !title.trim() || title.trim().length > 40) {
        errors.errorsMessages.push({ message: 'Incorrect title!', field: 'title' });
    }
    if (!author || typeof author !== 'string' || !author.trim() || author.trim().length > 20) {
        errors.errorsMessages.push({ message: 'Incorrect author!', field: 'author' });
    }
    if (!Array.isArray(availableResolutions)) {
        availableResolutions = [];
    } else {
        availableResolutions.forEach((r) => {
            if (!availableResolution.includes(r)) {
                errors.errorsMessages.push({ message: 'Incorrect availableResolution!', field: 'availableResolution' });
            }
        });
    }
    if (errors.errorsMessages.length) {
        res.status(400).send(errors);
        return;
    }

    const createdAt = new Date();
    const publicationDate = new Date();

    publicationDate.setDate(createdAt.getDate() + 1);

    const newVideo: VideoType = {
        id: +(new Date()),
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: createdAt.toISOString(),
        publicationDate: publicationDate.toISOString(),
        title,
        author,
        availableResolutions,
    };

    videos.push(newVideo);
    res.status(201).send(newVideo);
});

app.delete('/testing/all-data', (req: RequestWithBody<CreateVideoType>, res: Response) => {
    videos.length = 0;
    res.sendStatus(204);
});
