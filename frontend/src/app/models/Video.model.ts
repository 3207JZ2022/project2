
export class Video{
    constructor(
        public name: string,
        public description: string,
        // public duration: number,
        public imgSrc: string,
        public id: number,
        public tag: string[],
        public releaseDate: string,
        public views: number,
        public episodes: number
    ){
    }

    getName(){
        return this.name;
    }

    getDescription(){
        return this.description;
    }

    // getDuration(){
    //     return this.duration;
    // }

    getImgSrc(){
        return this.imgSrc;
    }

    getId(){
        return this.id;
    }

    getTag(){
        return this.tag;
    }

    getReleaseDate(){
        return this.releaseDate
    }

    getViews(){
        return this.views;
    }

    getEpisode(){
        return this.episodes;
    }
}