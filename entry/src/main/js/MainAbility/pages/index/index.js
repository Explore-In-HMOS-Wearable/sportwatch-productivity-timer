import router from '@system.router';

export default {
    data: {
        todolist: [
            {
                title: 'Workout',
            },
            {
                title: 'Meditation',
            },
            {
                title: 'Cooking',
            },
            {
                title: 'Study',
            },
            {
                title: 'Reading',
            },
            {
                title: 'Language Practice',
            },
            {
                title: 'Deep Work',
            },
            {
                title: 'Homework',
            }
        ],
    },

    pushPage() {
        router.replace({
            uri: 'pages/timer/timer'
        });
    },

    onInit() {
    }
};
