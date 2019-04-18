export const mockPlans = [
    {
        key: "id0",
        name: "Borobudur",
        owner: "Jan Kowalski",
        date: new Date(),
        start_location: 0,
        status: "CREATED",
        places: [
            {
                key: "id0",
                name: "Borobudur",
                price: 200000,
                duration: 2,
                coordinates: 0
            },
            {
                key: "id1",
                name: "Prambanan",
                price: 150000,
                duration: 2.5,
                coordinates: 0
            }
        ]
    },
    {
        key: "id1",
        name: "Abc",
        owner: "Test test",
        date: new Date(),
        start_location: 0,
        status: "CREATED",
        places: [
            {
                key: "id0",
                name: "Defeg 1",
                price: null,
                duration: 2,
                coordinates: 0
            },
            {
                key: "id1",
                name: "Test test1",
                price: 150000,
                duration: null,
                coordinates: 0
            }
        ]
    }
];