export default [
    {
        title: "Pop",
        keywords: [
            { query: ["pop music", "поп музыка"], yearPostfix: 1990 },
            "европа плюс музыка",
            "русское радио музыка"
        ]
    },
    {
        title: "Rock",
        children: [
            {
                title: "Hard Rock",
                keywords: { epochPostfix: 1970 },
            },
            {
                title: "Punk Rock",
                keywords: { epochPostfix: 1970 },
            },
            {
                title: "Post Rock",
                keywords: {
                    query: ["post rock", "shoegaze music", "post punk"],
                    yearPostfix: 2000
                },
            },
            {
                title: "Alternative Rock",
                keywords: {
                    epochPostfix: 1990,
                    yearPostfix: 2000,
                }
            },
            {
                title: "Progressive Rock",
                keywords: { epochPostfix: 1970 },
            },
            {
                title: "Russian Rock",
                keywords: {
                    query: ["Русский рок клипы"],
                    epochPostfix: 1980,
                    yearPostfix: 2000,
                }
            }
        ].sort(comparator),
    },
    {
        title: "Metal",
        children: [
            {
                title: "Heavy Metal",
                keywords: { epochPostfix: 1980 },
            },
            {
                title: "Power Metal",
                keywords: { epochPostfix: 2000 },
            },
            {
                title: "Thrash Metal",
                keywords: { epochPostfix: 1980 },
            },
            {
                title: "Black Metal",
                keywords: {
                    epochPostfix: 1980,
                    yearPostfix: 2000,
                },
            },
            {
                title: "Death Metal",
                children: [
                    {
                        title: "Melodic Death",
                        keywords: {
                            query: "Melodic death metal",
                            yearPostfix: 2000,
                        }
                    }
                ].sort(comparator)
            },
            {
                title: "Metalcore",
                keywords: { yearPostfix: 2000 },
            },
            {
                title: "Nu Metal",
                keywords: {
                    yearPostfix: 2000,
                    epochPostfix: 1990,
                },
            },
            {
                title: "Post Metal",
                keywords: {
                    query: ["post metal", "post black metal"],
                    yearPostfix: 2005
                }
            },
            {
                title: "Folk Metal",
                keywords: {
                    query: ["folk metal", "pagan metal", "viking metal"],
                    yearPostfix: 2005,
                }
            },
        ].sort(comparator),
    },
    {
        title: "Electronic",
        children: [
            {
                title: "Ambient",
                keywords: { yearPostfix: 2015 }
            },
            {
                title: "House",
                children: [
                    {
                        title: "Deep House",
                        keywords: { yearPostfix: 2010 }
                    },
                    {
                        title: "Electro House",
                        keywords: { yearPostfix: 2010 }
                    },
                ].sort(comparator)
            },
            {
                title: "Trance",
                children: [
                    {
                        title: "Progressive Trance",
                        keywords: { yearPostfix: 2005 }
                    },
                    {
                        title: "Uplifting Trance",
                        keywords: { yearPostfix: 2005 }
                    },
                    {
                        title: "Vocal Trance",
                        keywords: { yearPostfix: 2005 }
                    },
                    {
                        title: "Goa-Psy Trance",
                        keywords: {
                            yearPostfix: 2000,
                            epochPostfix: 1990,
                        }
                    },
                ].sort(comparator)
            },
            {
                title: "Hardstyle",
                children: [
                    {
                        title: "Hardcore",
                        keywords: {
                            query: ["Electronic hardcore", "electronic hardstyle"],
                            keywords: {
                                yearPostfix: 2000,
                                epochPostfix: 1990,
                            }
                        }
                    },
                    {
                        title: "Gabber",
                        keywords: { yearPostfix: 2010 }
                    },
                ].sort(comparator)
            },
            {
                title: "Light & Relax",
                children: [
                    {
                        title: "Lounge",
                        keywords: { yearPostfix: 2010 }
                    },
                    {
                        title: "Chillout",
                        keywords: { yearPostfix: 2010 }
                    },
                    {
                        title: "Trip-Hop",
                        keywords: { yearPostfix: 2010 }
                    },
                ].sort(comparator)
            },
            {
                title: "Drum & Bass",
                keywords: {
                    query: ["Drum & Bass", "liquid drum and bass"],
                    yearPostfix: 2005,
                }
            },
            {
                title: "Techno",
                keywords: {
                    query: ["Techno", "Detroit techno"],
                    yearPostfix: 2005,
                    epochPostfix: 1990,
                }
            }
        ].sort(comparator)
    },
    {
        title: "Hip-Hop & Rap",
        keywords: { yearPostfix: 2000, epochPostfix: 1990 },
        children: [
            {
                title: "Russian Rap",
                keywords: { yearPostfix: 2005, epochPostfix: 1990 },
            }
        ].sort(comparator)
    },
    {
        title: "Jazz",
        children: [
            {
                title: "Classic Jazz",
            },
            {
                title: "Bebop Jazz",
            },
            {
                title: "Piano Jazz",
            },
            {
                title: "Acid Jazz",
            },
            {
                title: "Avantgarde Jazz",
            },
        ].sort(comparator)
    },
    {
        title: "Blues",
        keywords: { epochPostfix: 1920 },
    },
    {
        title: "Ska",
    },
    {
        title: "Classical",
    },
    {
        title: "Instrumental",
        children: [
            {
                title: "Guitar",
                keywords: "instrumental guitar music",
            },
            {
                title: "Piano",
                keywords: "instrumental piano music",
            },
        ].sort(comparator)
    }
].sort(comparator);

function comparator(a, b) {
    if (a.title > b.title) {
        return 1;
    }
    if (a.title < b.title) {
        return -1;
    }
    return 0;
};