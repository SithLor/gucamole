const Data = {
    data:[],
    file_table:[]
}
interface _file_descriptor{
    file_path:string
    content:string
    created:`${string}-${string}-${string}`
    author:string
}
function create_file(file:_file_descriptor){
    const rand_id = 
    Data.data.push({
        id:crypto.randomUUID(),
        file:file.file_path,
        created:file.created,
        author:'admin'
    })
    Data.file_table.push({id:rand_id,file:file.file_path})
    
}
function get_file(file_path:string){
    const file = Data.file_table.find((file)=>file.file===file_path)
    if(!file) throw new Error('File not found')
    return Data.data[file.id]
}
function update_file(file_path:string,content:string){
    const file = Data.file_table.find((file)=>file.file===file_path)
    if(!file) throw new Error('File not found')
    Data.data[file.id].content = content
}
function delete_file(file_path:string){
    const file = Data.file_table.find((file)=>file.file===file_path)
    if(!file) throw new Error('File not found')
    Data.data.splice(file.id,1)
    Data.file_table.splice(file.id,1)
}
function get_files(){
    return Data.data
}
function get_files_by_author(author:string){
    return Data.data.filter((file)=>file.author===author)
}
function get_files_by_date(date:string){
    return Data.data.filter((file)=>file.created===date)
}
function get_files_by_content(content:string){
    return Data.data.filter((file)=>file.content===content)
}
function get_files_by_file(file:string){
    return Data.data.filter((file)=>file.file===file)
}
function get_files_by_id(id:string){
    return Data.data.filter((file)=>file.id===id)
}
function get_files_by_id(id:string){
    return Data.data.filter((file)=>file.id===id)
}

create_file({author:'admin',content:'hello world',created:'2021-10-10',file_path:'main.ts'})

console.log(Data)