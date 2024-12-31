import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use('/node_modules', express.static(path.resolve('node_modules')));
app.use(express.json());

// In-memory data storage
let workers = [
    {
        id: 6,
        name: 'Jake Sipe',
        time: '04:01 pm',
        phone: '555-0101',
        email: 'jake.sipe@example.com',
        status: 'active'
    },
    {
        id: 3,
        name: 'Bryan Broberg',
        time: '05:15 pm',
        phone: '555-0102',
        email: 'bryan.broberg@example.com',
        status: 'active'
    },
    {
        id: 6,
        name: 'Gerald Roberts',
        time: '04:40 pm',
        phone: '555-0103',
        email: 'gerald.roberts@example.com',
        status: 'active'
    },
    {
        id: 0,
        name: 'Test Technician',
        time: '10:55 am',
        phone: '555-0104',
        email: 'test.tech@example.com',
        status: 'active'
    },
    {
        id: 2,
        name: 'Cody Scott',
        time: '03:11 pm',
        phone: '555-0105',
        email: 'cody.scott@example.com',
        status: 'active'
    }
];

let appointments = [
    {
        id: 1,
        workerId: 6,
        title: 'St Anthony Remote, Keyless and/or',
        location: 'CA15',
        start: '2024-12-19T08:00:00',
        end: '2024-12-19T11:00:00',
        type: 'service'
    },
    {
        id: 2,
        workerId: 3,
        title: 'Eden Prairie Tune up or Adjustment',
        location: 'No CA',
        start: '2024-12-19T08:00:00',
        end: '2024-12-19T11:00:00',
        type: 'service'
    },
    {
        id: 3,
        workerId: 6,
        title: 'Lunch',
        location: '',
        start: '2024-12-19T12:00:00',
        end: '2024-12-19T13:00:00',
        type: 'lunch'
    }
];

// Helper Function: Generate unique ID
const generateId = (collection) => Math.max(0, ...collection.map(item => item.id)) + 1;

// Routes for Workers
app.get('/api/workers', (req, res) => res.json(workers));

app.get('/api/workers/:id', (req, res) => {
    const worker = workers.find(w => w.id === parseInt(req.params.id));
    return worker
        ? res.json(worker)
        : res.status(404).json({ error: 'Worker not found' });
});

app.put('/api/workers/:id', (req, res) => {
    const workerIndex = workers.findIndex(w => w.id === parseInt(req.params.id));
    if (workerIndex === -1) {
        return res.status(404).json({ error: 'Worker not found' });
    }
    workers[workerIndex] = { ...workers[workerIndex], ...req.body };
    res.json(workers[workerIndex]);
});

// Routes for Appointments
app.get('/api/appointments', (req, res) => {
    const { date, workerId } = req.query;
    let filtered = appointments;

    if (date) {
        filtered = filtered.filter(apt => apt.start.startsWith(date));
    }

    if (workerId) {
        filtered = filtered.filter(apt => apt.workerId === parseInt(workerId));
    }

    res.json(filtered);
});

app.post('/api/appointments', (req, res) => {
    const newAppointment = {
        id: generateId(appointments),
        ...req.body
    };
    appointments.push(newAppointment);
    res.status(201).json(newAppointment);
});

app.put('/api/appointments/:id', (req, res) => {
    const appointmentIndex = appointments.findIndex(a => a.id === parseInt(req.params.id));
    if (appointmentIndex === -1) {
        return res.status(404).json({ error: 'Appointment not found' });
    }
    appointments[appointmentIndex] = { 
        ...appointments[appointmentIndex], 
        ...req.body 
    };
    res.json(appointments[appointmentIndex]);
});

app.delete('/api/appointments/:id', (req, res) => {
    const appointmentIndex = appointments.findIndex(a => a.id === parseInt(req.params.id));
    if (appointmentIndex === -1) {
        return res.status(404).json({ error: 'Appointment not found' });
    }
    appointments.splice(appointmentIndex, 1);
    res.status(204).send();
});

// Search Endpoint
app.get('/api/search', (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
    }

    const lowerQuery = query.toLowerCase();
    const searchResults = {
        workers: workers.filter(worker => worker.name.toLowerCase().includes(lowerQuery)),
        appointments: appointments.filter(apt => 
            apt.title.toLowerCase().includes(lowerQuery) ||
            apt.location.toLowerCase().includes(lowerQuery)
        )
    };

    res.json(searchResults);
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// For Vercel Deployment
export default app;
