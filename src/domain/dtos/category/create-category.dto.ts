

export class CreateCategoryDto{

    private constructor(
        public readonly name: string,
        public readonly available: boolean,
        public readonly userId: string
    ){}

    static create(obj : {[key: string]: any}): [string?, CreateCategoryDto?]{
            const {name, available= false, user: {id} }= obj;
            //const {id}= user;
            let availableBoolean = available;
    
            if(!name){
                return ["Missing name", undefined];
            }

            if(typeof available !== "boolean"){
                availableBoolean = (available ==="true");
            }
    
            return [undefined, new CreateCategoryDto(name, availableBoolean, id)];
        }



}