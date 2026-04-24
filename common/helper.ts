function toId(str:string):string{
    return str.toLowerCase().trim().replace(/\s+/g,'-');
}
export {toId}; 
