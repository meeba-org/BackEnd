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
                {
                    // eslint-disable-next-line no-undef
                    "clockInTime": {$gte: ISODate("2019-01-01T00:00:00.000+0000")}, // Since 01/01/2019

                    // Absence Days
                    // $or: [ { "task": ObjectId("5e006ebb9777c6775113d2cb") }, { "task": ObjectId("5e006e839777c6775113d2c9") }, { "task": ObjectId("5e006ea49777c6775113d2ca") } ] }

                    // Fixing shifts
                    // "draftShift": { $exists: true } },

                    // Bonus
                    // "extraPay": { $gt: NumberInt(0) } },

                    // Break Length
                    // "breakLength": { $gt: NumberInt(0) } },

                    // Tasks
                    // "task": { $exists: true } },

                    // Notes
                    // "note": { $exists: true } },

                    // Public Transportation
                    // "commuteCost.publicTransportation": { $gt: NumberInt(0) } }
                }
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
