export default [
    {
        title: "Pop",
    },
    {
        title: "Rock",
        children: [
            {
                title: "Hard Rock",
            },
            {
                title: "Punk Rock",
            },
            {
                title: "Post Rock",
            },
            {
                title: "Alternative Rock"
            },
            {
                title: "Progressive Rock",
            },
            {
                title: "Russian Rock",
            }
        ].sort(comparator),
    },
    {
        title: "Metal",
        children: [
            {
                title: "Heavy Metal",
            },
            {
                title: "Power Metal",
            },
            {
                title: "Thrash Metal",
            },
            {
                title: "Black Metal",
            },
            {
                title: "Death Metal",
                children: [
                    {
                        title: "Melodic Death"
                    }
                ].sort(comparator)
            },
            {
                title: "Metalcore",
            },
            {
                title: "Nu Metal",
            },
            {
                title: "Post Metal",
            },
            {
                title: "Folk Metal",
                children: [
                    {
                        title: "Pagan Metal",
                    },
                    {
                        title: "Viking Metal",
                    }
                ].sort(comparator)
            },
        ].sort(comparator),
    },
    {
        title: "Electronic",
        children: [
            {
                title: "Ambient",
            },
            {
                title: "House",
                children: [
                    {
                        title: "Deep House",
                    },
                    {
                        title: "Electro House",
                    },
                ].sort(comparator)
            },
            {
                title: "Trance",
                children: [
                    {
                        title: "Progressive Trance",
                    },
                    {
                        title: "Uplifting Trance",
                    },
                    {
                        title: "Vocal Trance",
                    },
                    {
                        title: "Goa-Psy Trance",
                    },
                ].sort(comparator)
            },
            {
                title: "Hardstyle",
                children: [
                    {
                        title: "Hardcore",
                    },
                    {
                        title: "Gabber",
                    },
                ].sort(comparator)
            },
            {
                title: "Chillout & Lounge",
            },
            {
                title: "Drum & Bass",
            },
            {
                title: "Techno",
            }
        ].sort(comparator)
    },
    {
        title: "Hip-Hop & Rap",
        children: [
            {
                title: "Russian Rap",
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
            },
            {
                title: "Piano",
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