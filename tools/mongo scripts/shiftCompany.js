db.shifts.aggregate([
    {
        $match: {
            clockInTime: {
                $gte: new Date("2016-01-01")
            }
        }
    }
]);
