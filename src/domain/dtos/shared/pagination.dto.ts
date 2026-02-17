

export class PaginationDto{
    private constructor(
        public readonly page: number,
        public readonly limit: number,
    ){

    }
    
    static create(page: number, limit: number): [string?, PaginationDto?]{

        if(isNaN(page) || page < 1){
            return ["Invalid page number", undefined];
        }

        if(isNaN(limit) || limit < 1){
            return ["Invalid limit", undefined];
        }

        return [undefined, new PaginationDto(page, limit)];
    }
}