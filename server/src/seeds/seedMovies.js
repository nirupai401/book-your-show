const AppDataSource=require('../data-source');
const Movie=require('../models/Movie');

const data=[
    {
        title:"O' Romeo",
        posterUrl:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/o-romeo-et00481091-1772498394.jpg",
        description:"What fate awaits a stone-hearted gangster, a bloodthirsty womaniser, when true love claims him, helpless and unguarded- a gang war that shakes the entire underworld and crime syndicate to their very roots A forbidden love, the tale of an unrequited passion.",
        genre:"Action",
        runtime:120,
        cast:[
            {
                name:"Shahid Kapoor",
                alias:"Ustara",
                profilePicture:"https://in.bmscdn.com/iedb/artist/images/website/poster/large/shahid-kapoor-2094-1680754317.jpg"
            },
            {
                name:"Tripti Dimri",
                alias:"Afsha",
                profilePicture:"https://in.bmscdn.com/iedb/artist/images/website/poster/large/tripti-dimri-1093177-1772434229.jpg"
            }
        ]
    },{
        title:"Assi",
        posterUrl:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/assi-et00484699-1770206778.jpg",
        description:"Eighty reported sexual assaults a day, every day. One every twenty minutes and these are just the reported ones Where does this come from? What does it leave behind? An investigative thriller that unfolds through a powerful courtroom drama",
        genre:"Drama , Thriller",
        runtime:143,
        cast:[
            {
                name:"Taapsee Pannu",
                profilePicture:"https://in.bmscdn.com/iedb/artist/images/website/poster/large/taapsee-pannu-20499-1702983209.jpg"
            },
            {
                name:"Kani Kusruti",
                profilePicture:"https://in.bmscdn.com/iedb/artist/images/website/poster/large/kani-kusruti-1051524-16-03-2021-02-36-48.jpg"
            }
        ]
    },{
        title:"Tu Yaa Main",
        posterUrl:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/tu-yaa-main-et00455230-1772217907.jpg",
        description:"A wannabe rapper from the outskirts of Mumbai, India, and an affluent influencer elope to a coastal town, only to find themselves trapped in the pool of a derelict resort fighting for survival against the wrath of a ferocious crocodile.",
        genre:"Adventure, Romantic, Thriller",
        runtime:145,
        cast:[
            {
                name:"Adarsh Gourav",
                alias:"Aala Flowpara",
                profilePicture:"https://in.bmscdn.com/iedb/artist/images/website/poster/large/adarsh-gourav-1086939-1740146605.jpg"
            },
            {
                name:"Shanaya Kapoor",
                alias:"Miss Vanity",
                profilePicture:"https://in.bmscdn.com/iedb/artist/images/website/poster/large/shanaya-kapoor-2029522-1689672159.jpg"
            }
        ]
    },
    {
        title:"Dhurandhar The Revenge",
        posterUrl:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/dhurandhar-the-revenge-et00478890-1772893614.jpg",
        description:"Dhurandhar The Revenge introduces Jaskirat Singh Rangi, tracing the chain of events that compel him to become Hamza Ali Mazari, and follows his rise as he operates deep inside Pakistan.",
        genre:"Action, Thriller",
        runtime:240,
        cast:[
            {
                name:"Ranveer Singh",
                alias:"Hamza Ali Mazari",
                profilePicture:"https://in.bmscdn.com/iedb/artist/images/website/poster/large/ranveer_singh_19858_26-07-2016_04-59-37.jpg"
            },
            {
                name:"Sara Arjun",
                alias:"yalina jamali",
                profilePicture:"https://in.bmscdn.com/iedb/artist/images/website/poster/large/sara-arjun-1055790-1764496804.jpg"
            }
        ]
    },
     {
        title:"Ustaad Bhagat Singh",
        posterUrl:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/ustaad-bhagat-singh-et00339939-1771925113.jpg",
        description:" Inspired by his teacher, who named him Bhagat Singh and shaped his values, a tribal boy grows up rooted in strong morals and unwavering courage. Standing firm against injustice, he takes on evil forces despite overwhelming odds. Ustaad Bhagat Singh is the story of a man who fights not just with strength, but with integrity and purpose.",
        genre:"Action, Thriller",
        runtime:214,
        cast:[
            {
                name:"Pawan Kalyan",
                profilePicture:"https://in.bmscdn.com/iedb/artist/images/website/poster/large/pawan-kalyan-26911-19-09-2017-02-46-38.jpg"
            },
            {
                name:"Sree Leela",
                profilePicture:"https://in.bmscdn.com/iedb/artist/images/website/poster/large/sree-leela-1265576-14-02-2019-02-06-22.jpgg"
            }
        ]
    },
    {
        title:"Toxic: A Fairy Tale for Grown-ups",
        posterUrl:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/toxic-a-fairy-tale-for-grown-ups-et00378770-1771578880.jpg",
        description:" Set in Goa between the early 1940s and the 1970s, Toxic is a savage action-thriller saga that plunges into the rot festering beneath paradise. In this coastal land of fading colonial shadows and rising crime syndicates, a man forges his empire through blood, fear, and betrayal. Power is not granted-it is seized, and it always demands repayment. As smuggling routes become battlegrounds and loyalties unravel into suspicion, paranoia turns into a means of survival. In the end, the only force more powerful than the consequences of his choices is the abyss within him.",
        genre:"Action, Thriller",
        runtime:214,
        cast:[
            {
                name:"Yash",
                alias:"Raya",
                profilePicture:"https://in.bmscdn.com/iedb/artist/images/website/poster/large/yash-2537-1649749519.jpg"
            },
            {
                name:"Kiara Advani",
                 alias:"Nadia",
                profilePicture:"https://in.bmscdn.com/iedb/artist/images/website/poster/large/kiara-advani-1043272-1655467015.jpg"
            },
             {
                name:"Nayanthara",
                 alias:"Ganga",
                profilePicture:"https://in.bmscdn.com/iedb/artist/images/website/poster/large/nayanthara-5143-1675058766.jpg"
            },
            {
                name:"Rukmini Vasanth",
                 alias:"Mellisa",
                profilePicture:"https://in.bmscdn.com/iedb/artist/images/website/poster/large/rukmini-vasanth-1092753-15-05-2018-10-49-55.jpg"
            }
        ]
    },
     {
        title:"Spider-Man: Brand New Day",
        posterUrl:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/spider-man-brand-new-day-et00447840-1748514576.jpg",
        description:"The fourth installment in the MCU Spider-Man franchise.",
        genre:"Action,Action,Sci-fi",
        runtime:214,
        cast:[
            {
                name:"Tom Holland",
                alias:"Peter Parker",
                profilePicture:"https://in.bmscdn.com/iedb/artist/images/website/poster/large/tom-holland-33741-15-12-2021-05-05-50.jpg"
            },
            {
                name:"Zendaya",
                 alias:"MJ",
                profilePicture:"https://in.bmscdn.com/iedb/artist/images/website/poster/large/zendaya-2016258-1684991803.jpg"
            }
        ]
    },
    {
        title:"Spirit",
        posterUrl:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/spirit-et00452121-1767338835.jpg",
        description:"Spirit is a multilingual movie directed by Sandeep Reddy Vanga, starring Prabhas and Tripti Dimri",
        genre:"Action, Thriller",
        runtime:214,
        cast:[
            {
                name:"Prabhas",
                profilePicture:"https://in.bmscdn.com/iedb/artist/images/website/poster/large/prabhas-1708-1686915417.jpg"
            },
            {
                name:"Tripti Dimri",
                profilePicture:"https://in.bmscdn.com/iedb/artist/images/website/poster/large/tripti-dimri-1093177-1772434229.jpg"
            }
        ]
    },
    {
        title:"Peddi",
        posterUrl:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/peddi-et00439772-1743151669.jpg",
        description:"In 1980s rural Andhra Pradesh, a spirited villager unites his community through sports to defend their pride against a powerful rival.",
        genre:"Action, Thriller",
        runtime:214,
        cast:[
            {
                name:"Ram Charan",
                profilePicture:"https://in.bmscdn.com/iedb/artist/images/website/poster/large/ram-charan-teja-1046368-19-09-2017-02-37-43.jpg"
            },
            {
                name:"Janhvi Kapoor",
                profilePicture:"https://in.bmscdn.com/iedb/artist/images/website/poster/large/janhvi-kapoor-1087603-1758700808.jpg"
            }
        ]
    },
    {
        title:"Project Hail Mary",
        posterUrl:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/project-hail-mary-et00451760-1751358286.jpg",
        description:"Science teacher Ryland Grace wakes up alone on a spaceship, light-years from Earth. As his memory returns, he uncovers a mission to stop a mysterious substance killing the Sun and save Earth. An unexpected friendship may be the key.",
        genre:"Adventure,Drama,Sci-fi",
        runtime:214,
        cast:[
            {
                name:"Ryan Gosling",
                alias:"Ryland Grace",
                profilePicture:"https://in.bmscdn.com/iedb/artist/images/website/poster/large/ryan-gosling-25971-24-03-2017-17-59-22.jpg"
            }
            ]
    }

]

async function main(){
   await  AppDataSource.connect();
   // delete all the movies
   await Movie.deleteMany({});

   //insert the movies
   await Movie.insertMany(data);

   //close the db connection
   await AppDataSource.disconnect();
   console.log('Data Seeded');
}

main();