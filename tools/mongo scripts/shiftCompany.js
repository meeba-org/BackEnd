db.shifts.aggregate([
    {
        $lookup:
            {
                from: "companies",
                localField: "company",
                foreignField: "_id",
                as: "shiftsCompany"
            }
    },
    {
        $match: {
            $and: [
                {"clockInTime": {$gte: new Date(new Date() - 30 * 60 * 60 * 24 * 1000)}}, // from
                {"clockInTime": {$lte: new Date(new Date() - 0 * 60 * 60 * 24 * 1000)}} // to
            ] 
        }    
    },
    {$sort: {clockInTime: -1}},
    {
        "$unwind": "$shiftsCompany" //Unwind that array
    },
    {
        $project: {
            "clockInTime": 1,
            "clockOutTime": 1,
            "companyName": "$shiftsCompany.name",
            "companyId": "$shiftsCompany._id",
            "user": 1,
            "location": 1,
        }
    },
    // Till here is list of shifts in the period time mention in $match
    {
        $group: {
            _id: "$companyId",
            Name: {$first: '$companyName'},
            Employees: {$addToSet: "$user"},
            ShiftsNumber: {$sum: 1}
        }
    },
    {
        $project: {
            Name: "$Name",
            Employees: {$size: "$Employees"},
            ShiftsNumber: "$ShiftsNumber"
        }
    },
    {$sort: {Employees: -1}}
    // Till here is number of unique employees and number of shifts per company for the period time mention in $match
]);
