export default [
    {
        title: "Genres",
        isJustContainer: true,
        children: [
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
                        keywords: {
                            query: ["Hard rock music", "Glam rock music"],
                            epochPostfix: 1970
                        },
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
                        useKeywordsFactor: 2,
                        maxTrackDuration: 1800,
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
                        noUseKeywords: true,
                    }
                ].sort(comparator),
            },
            {
                title: "Metal",
                children: [
                    {
                        title: "Heavy Metal",
                        noUseKeywords: true,
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
                        },
                        useKeywordsFactor: 2,
                        maxTrackDuration: 1800,
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
                maxTrackDuration: 10800,
                children: [
                    {
                        title: "Ambient",
                        maxTrackDuration: 10800,
                        keywords: {
                            query: "ambient music -chillout",
                            yearPostfix: 2015
                        }
                    },
                    {
                        title: "House",
                        maxTrackDuration: 10800,
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
                        maxTrackDuration: 10800,
                        children: [
                            {
                                title: "Progressive Trance",
                                maxTrackDuration: 10800,
                                keywords: { yearPostfix: 2005 }
                            },
                            {
                                title: "Uplifting Trance",
                                maxTrackDuration: 10800,
                                keywords: { yearPostfix: 2005 }
                            },
                            {
                                title: "Vocal Trance",
                                maxTrackDuration: 10800,
                                keywords: { yearPostfix: 2005 }
                            },
                            {
                                title: "Goa-Psy Trance",
                                maxTrackDuration: 10800,
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
                        maxTrackDuration: 10800,
                        children: [
                            {
                                title: "Lounge",
                                maxTrackDuration: 10800,
                                keywords: { yearPostfix: 2010 }
                            },
                            {
                                title: "Chillout",
                                maxTrackDuration: 10800,
                                keywords: { yearPostfix: 2010 }
                            },
                            {
                                title: "Trip-Hop",
                                maxTrackDuration: 10800,
                                keywords: { yearPostfix: 2010 }
                            },
                        ].sort(comparator)
                    },
                    {
                        title: "Drum & Bass",
                        maxTrackDuration: 10800,
                        keywords: {
                            query: ["Drum & Bass", "liquid drum and bass"],
                            yearPostfix: 2005,
                        }
                    },
                    {
                        title: "Techno",
                        maxTrackDuration: 10800,
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
                maxTrackDuration: 3600,
                children: [
                    {
                        title: "Classic Jazz",
                        maxTrackDuration: 3600,
                    },
                    {
                        title: "Bebop Jazz",
                        maxTrackDuration: 3600,
                    },
                    {
                        title: "Piano Jazz",
                        maxTrackDuration: 3600,
                    },
                    {
                        title: "Acid Jazz",
                        maxTrackDuration: 3600,
                    },
                    {
                        title: "Avantgarde Jazz",
                        maxTrackDuration: 3600,
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
                maxTrackDuration: 3600,
            },
            {
                title: "Instrumental",
                maxTrackDuration: 3600,
                children: [
                    {
                        title: "Guitar",
                        keywords: "instrumental guitar music",
                        maxTrackDuration: 3600,
                    },
                    {
                        title: "Piano",
                        keywords: "instrumental piano music",
                        maxTrackDuration: 3600,
                    },
                ].sort(comparator)
            }
        ]
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