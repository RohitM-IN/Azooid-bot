
/**
 * Get PUBG user rank
 * @param {number} rankPoints Number off rank points
 * @returns Return object with rankPicture and rankColor
 */
exports.getRank = function(rankPoints){
    var rankObject;

    switch (true) {
        case rankPoints < 1000 :
        rankObject = {
            rankPicture: 'https://i.postimg.cc/3wWv8RfP/beginner.png',
            rankColor: '#8d5844'
        }
        break;

        case rankPoints < 2000 :
        rankObject = {
            rankPicture: 'https://i.postimg.cc/J0CD5Q7L/novice.png',
            rankColor: '#aaacae'
        }
        break;

        case rankPoints < 3000 :
        rankObject = {
            rankPicture: 'https://i.postimg.cc/g056nWfr/experienced.png',
            rankColor: '#bbad7e'
        }
        break;

        case rankPoints < 4000 :
        rankObject = {
            rankPicture: 'https://i.postimg.cc/sf5ZDbKD/skilled.png',
            rankColor: '#7097ba'
        }
        break;

        case rankPoints < 5000 :
        rankObject = {
            rankPicture: 'https://i.postimg.cc/ZKZv9jDP/specialist.png',
            rankColor: '#7e7fd6'
        }
        break;

        case rankPoints < 6000 :
        rankObject = {
            rankPicture: 'https://i.postimg.cc/hv8Jy7h7/expert.png',
            rankColor: '#f1d36e'
        }
        break;

        case rankPoints >= 6000 :
        rankObject = {
            rankPicture: 'https://i.postimg.cc/kXc6W8k0/survivor.png',
            rankColor: '#f2a900'
        }
        break;
    }

    return rankObject;
};