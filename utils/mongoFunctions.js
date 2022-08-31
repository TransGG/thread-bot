const colors = require('colors');

const Threads = require('../models/threads');

module.exports = client => {

    client.manageThread = async (threadId, threadName) => {

        const fetchedThread = await Threads.findById(threadId);

        if (fetchedThread) {
            // Update the thread's name.
            fetchedThread.name = threadName;
            fetchedThread.lastActive = Date.now();
            
            await fetchedThread.save();

            console.log(`=== Found Existing Thread: ${threadId} ===`.green);

            return fetchedThread
        }


        const newThread = new Threads({
            _id: threadId,
            name: threadName,
        });

        await newThread.save();

        console.log(`=== Created New Thread: ${threadId} ===`.yellow);

        return newThread

    }

    client.incrementThread = async (threadId, threadName) => {

        // Make sure the thread exists
        const thread = await client.manageThread(threadId, threadName);

        // Increment the thread's total messages
        thread.total++;
        // Increment the thread's weekly messages
        thread.weekly++;

        // Save the thread
        await thread.save();

        console.log(`=== Incremented Thread: ${threadId} ===`.blue);

        return thread;

    }

    client.editThreadTypes = async (threadId, threadName, newTypes) => {

        // Make sure the thread exists
        const thread = await client.manageThread(threadId, threadName);

        // Set the thread's types to the new types
        let newThread = await Threads.findByIdAndUpdate(threadId, {
            types: newTypes
        });

        console.log(`=== Edited Thread Types: ${threadId} ===`.magenta);

        return newThread

    }

    client.getAllThreads = async () => {

        const threads = await Threads.find({});

        return threads;

    }

    client.findThread = async (threadId) => {

        const threads = await Threads.findById(threadId);

        return threads;

    }

    client.findThreadByType = async (typeName) => {

        const threads = await Threads.find({
            types: typeName
        });

        return threads;

    }

}