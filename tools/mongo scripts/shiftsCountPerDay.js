db.shifts.aggregate([
    {
        $match: {
            clockInTime: {
                $gte: new Date("2016-01-01")
            }
        }
    },
    {
        $group: {
            _id: {
                "year": {"$year": "$clockInTime"},
                "month": {"$month": "$clockInTime"},
                "day": {"$dayOfMonth": "$clockInTime"}
            },
            count: {$sum: 1}
        }
    },
    {
        $project: {
            "_id": 0,
            Day: "$_id.day",
            Month: "$_id.month",
            Year: "$_id.year",
            Count: "$count",
        }
    },
    {$sort: {"Year": -1, "Month": -1, "Day": -1}}
]);
